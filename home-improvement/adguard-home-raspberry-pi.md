# Raspberry Pi + AdGuard Home Quick Setup

A compact rebuild guide for setting up AdGuard Home on a Raspberry Pi 4B with Raspberry Pi OS Lite and a Netgear Nighthawk router.

## Setup Used

- Raspberry Pi 4B
- Raspberry Pi Imager
- Raspberry Pi OS Lite
- Ethernet preferred over Wi-Fi
- Netgear Nighthawk router
- AdGuard Home

## Goal

Use the Raspberry Pi as a network-wide DNS filtering server for ad blocking, tracker blocking, and DNS visibility.

## 1. Flash Raspberry Pi OS Lite

Use Raspberry Pi Imager.

Recommended settings:

- OS: Raspberry Pi OS Lite
- Enable SSH
- Configure username/password
- Configure Wi-Fi only if Ethernet is unavailable

Boot the Pi and connect it to the router. Ethernet is preferred because it avoids dual-interface confusion between `wlan0` and `eth0`.

## 2. Update the Pi

```bash
sudo apt update
sudo apt upgrade -y
sudo reboot
```

## 3. Find the Pi IP Address

```bash
hostname -I
```

Or:

```bash
ip addr
```

If both Wi-Fi and Ethernet are connected, the Pi may have two addresses:

```text
wlan0 = 192.168.1.x
eth0  = 192.168.1.y
```

Use the Ethernet address if available.

## 4. Reserve a Static IP on the Router

In the Netgear Nighthawk admin UI:

```text
Advanced → Setup → LAN Setup → Address Reservation
```

Reserve the Raspberry Pi Ethernet IP.

This prevents the DNS server IP from changing later.

## 5. Install AdGuard Home

```bash
wget https://static.adtidy.org/adguardhome/release/AdGuardHome_linux_arm64.tar.gz
```

```bash
tar xvf AdGuardHome_linux_arm64.tar.gz
```

```bash
cd AdGuardHome
```

```bash
sudo ./AdGuardHome -s install
```

## 6. Check Installed Version

```bash
AdGuardHome --version
```

If that does not work:

```bash
sudo /opt/AdGuardHome/AdGuardHome --version
```

This is useful because screenshots and setup guides may not match the installed version.

## 7. Open AdGuard Home

Open:

```text
http://<PI-IP>:3000
```

Example:

```text
http://192.168.1.x:3000
```

Complete the setup wizard and create an admin account.

## 8. Configure Upstream DNS

Example upstream resolvers:

```text
https://dns.cloudflare.com/dns-query
https://dns.quad9.net/dns-query
```

Avoid using the router IP as AdGuard's upstream resolver unless there is a specific reason.

## 9. Test One Device First

Before changing the whole network, manually set one device's DNS server to the Raspberry Pi IP.

Test DNS:

```bash
nslookup google.com
```

Expected result:

```text
Server: <PI-IP>
```

If this works, AdGuard is resolving DNS correctly.

## 10. Router-Wide DNS

In the Nighthawk router, configure DNS to point to the Raspberry Pi if the firmware allows it.

Important caveat: many Netgear Nighthawk routers proxy DNS and still hand out the router IP to clients.

That means AdGuard may show:

```text
192.168.1.1
```

instead of individual devices.

Filtering can still work even if client visibility is limited.

## 11. DHCP Option

For better per-device visibility, AdGuard Home can run DHCP instead of the router.

Do not disable router DHCP until:

1. The Pi has a static/reserved IP.
2. AdGuard Home is reachable.
3. AdGuard DHCP is configured.
4. You know how to re-enable router DHCP if needed.

If router DHCP is disabled before AdGuard DHCP is running, devices may lose IP addresses and the AdGuard web interface may become unreachable.

## Troubleshooting

### AdGuard only shows the router

Likely cause: Netgear DNS proxy behavior.

This usually means traffic flows like this:

```text
Client → Router → AdGuard
```

instead of:

```text
Client → AdGuard
```

### AdGuard UI will not load

Check service status:

```bash
sudo systemctl status AdGuardHome
```

Restart:

```bash
sudo systemctl restart AdGuardHome
```

View logs:

```bash
sudo journalctl -u AdGuardHome -f
```

### Check current IP

```bash
hostname -I
```

### Check DNS resolution

```bash
nslookup google.com
```

## Rebuild Checklist

1. Flash Raspberry Pi OS Lite with Raspberry Pi Imager.
2. Enable SSH.
3. Boot Pi on Ethernet.
4. Update OS.
5. Check Pi IP.
6. Reserve Pi IP in router.
7. Install AdGuard Home.
8. Check installed version from CLI.
9. Open AdGuard web UI.
10. Configure upstream DNS.
11. Test one client manually.
12. Configure router DNS or move DHCP to AdGuard if needed.

## Lessons Learned

- Reserve the Pi IP before changing network-wide DNS.
- Use Ethernet if possible.
- Netgear Nighthawk routers may hide individual clients behind the router IP.
- DNS filtering and client visibility are separate problems.
- Do not disable router DHCP until AdGuard DHCP is fully configured.
- Keep recovery access to the router available during setup.
