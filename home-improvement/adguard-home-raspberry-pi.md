# Raspberry Pi + AdGuard Home Setup

A rebuild guide for running AdGuard Home on a Raspberry Pi 4B with Raspberry Pi OS Lite, using AdGuard for DNS filtering and DHCP-based client visibility.

## Current Goal

Use the Raspberry Pi as the network-wide DNS and DHCP service so AdGuard can:

- block ads and trackers at the DNS layer
- show traffic by individual client/device
- avoid router DNS proxy visibility issues
- keep the setup portable when moving the router from a modem to an apartment Ethernet handoff

## Current Issue

The Pi was initially configured with both Wi-Fi and Ethernet available. That created a current troubleshooting problem: the Pi can appear with two LAN IP addresses, one for `wlan0` and one for `eth0`.

Current lesson: for this setup, the Pi should have been configured Ethernet-only from the start. Wi-Fi should be left unconfigured unless Ethernet is unavailable.

## Current Architecture

```text
Spectrum modem or apartment Ethernet
        ↓
Personal router WAN port
        ↓
Personal router LAN/Wi-Fi
        ↓
Raspberry Pi 4B running AdGuard Home
        ↓
Client devices
```

Network roles:

```text
Router: gateway + NAT + Wi-Fi
AdGuard/Pi: DHCP + DNS filtering
Clients: receive IP leases from AdGuard
```

The router remains the internet gateway. AdGuard DHCP should hand out the router IP as the gateway and the Pi IP as DNS.

## Hardware / Software Used

- Raspberry Pi 4B
- Raspberry Pi Imager
- Raspberry Pi OS Lite
- Ethernet from router to Pi
- Personal router / Netgear Nighthawk-style setup
- AdGuard Home
- Optional WAN source: Spectrum modem or apartment Ethernet jack

## 1. Flash Raspberry Pi OS Lite

Use Raspberry Pi Imager.

Recommended settings:

- OS: Raspberry Pi OS Lite
- Enable SSH
- Configure username/password
- Do **not** configure Wi-Fi if the Pi will be wired by Ethernet
- Configure Wi-Fi only if Ethernet is unavailable

Ethernet is preferred because it avoids confusion between `wlan0` and `eth0`. For this AdGuard setup, initial Wi-Fi configuration created avoidable ambiguity because the Pi can later appear as two devices or two IPs on the LAN.

## 2. Update the Pi

```bash
sudo apt update
sudo apt upgrade -y
sudo reboot
```

## 3. Find the Pi IP Address

```bash
hostname -I
ip route
ip addr
```

If both Wi-Fi and Ethernet are connected, the Pi may have two addresses:

```text
wlan0 = 192.168.1.x
eth0  = 192.168.1.y
```

Use the Ethernet address if available. If both addresses are active, treat that as a configuration issue to clean up before relying on the Pi for DHCP/DNS.

Recommended cleanup:

1. Keep Ethernet connected.
2. Remove or disable the saved Wi-Fi connection.
3. Reserve only the Ethernet MAC/IP on the router.
4. Use the Ethernet IP in AdGuard, router DNS, and DHCP settings.
5. Reboot the Pi and confirm only the intended Ethernet IP remains active.

Useful checks:

```bash
ip addr show wlan0
ip addr show eth0
ip route
hostname -I
```

## 4. Make the Pi IP Static

The Pi should have a stable address before changing DNS or DHCP.

Preferred model:

```text
Router/gateway: 192.168.1.1
Pi/AdGuard:     192.168.1.10
DHCP range:     192.168.1.100 - 192.168.1.250
Subnet mask:    255.255.255.0
```

The Pi should usually be **outside** the AdGuard DHCP pool but inside the same subnet.

Good:

```text
Pi:        192.168.1.10
DHCP pool: 192.168.1.100 - 192.168.1.250
```

Bad:

```text
Pi:        192.168.1.150
DHCP pool: 192.168.1.100 - 192.168.1.250
```

The bad example risks another client receiving the Pi's IP.

## 5. Install AdGuard Home

```bash
wget https://static.adtidy.org/adguardhome/release/AdGuardHome_linux_arm64.tar.gz
tar xvf AdGuardHome_linux_arm64.tar.gz
cd AdGuardHome
sudo ./AdGuardHome -s install
```

## 6. Check Installed Version and Status

```bash
sudo /opt/AdGuardHome/AdGuardHome --version
sudo systemctl status AdGuardHome
```

If needed:

```bash
sudo systemctl restart AdGuardHome
sudo journalctl -u AdGuardHome -f
```

## 7. Open AdGuard Home

Initial setup UI:

```text
http://<PI-IP>:3000
```

After setup, the admin UI is usually:

```text
http://<PI-IP>
```

## 8. Configure Upstream DNS

In AdGuard:

```text
Settings → DNS settings → Upstream DNS servers
```

Reliable starting config:

```text
https://dns.cloudflare.com/dns-query
https://dns.google/dns-query
```

Bootstrap DNS:

```text
1.1.1.1
8.8.8.8
```

Fallback DNS:

```text
1.1.1.1
8.8.8.8
```

Recommended while troubleshooting:

- Enable parallel requests.
- Keep blocklists minimal.
- Avoid using the router IP as AdGuard's upstream DNS unless specifically needed.

Avoid DNS loops:

```text
Bad:
Router DNS → Pi
Pi upstream DNS → Router
Router DNS → Pi

Good:
Clients → Pi/AdGuard
AdGuard → Cloudflare / Google / Quad9 / other upstream
```

## 9. Test DNS Before Moving DHCP

From a client:

```bash
nslookup google.com
```

Expected:

```text
Server: <PI-IP>
```

From the Pi:

```bash
dig google.com @127.0.0.1
dig google.com @<PI-IP>
ping -c 3 1.1.1.1
ping -c 3 google.com
```

Interpretation:

| Result | Meaning |
|---|---|
| `1.1.1.1` works but `google.com` fails | DNS issue |
| both fail | gateway/network issue |
| both work | Pi network path is healthy |

## 10. AdGuard DHCP Configuration

Use AdGuard DHCP if you want client/device names and per-device visibility.

In AdGuard:

```text
Settings → DHCP settings
```

Example settings:

```text
Interface:      eth0
Gateway IP:     192.168.1.1
Subnet mask:    255.255.255.0
Range start:    192.168.1.100
Range end:      192.168.1.250
Lease duration: 86400
DNS server:     192.168.1.10
```

Important:

```text
Gateway = router IP
DNS     = Pi IP
```

The Pi should not be the gateway unless it is actually routing traffic.

## 11. Disable Router DHCP

If AdGuard DHCP is the final target:

```text
AdGuard DHCP = ON
Router DHCP  = OFF
```

Do **not** leave both DHCP servers enabled long-term.

Two DHCP servers can cause:

- duplicate IPs
- random lease assignment
- inconsistent DNS settings
- intermittent “connected, no internet” errors
- some devices appearing in AdGuard and others not

Migration procedure:

1. Confirm Pi has a static IP outside the DHCP pool.
2. Enable AdGuard DHCP.
3. Confirm AdGuard DHCP settings use router as gateway and Pi as DNS.
4. Disable router DHCP.
5. Reboot router if needed.
6. Renew client leases.

Renew leases by:

- toggling Wi-Fi off/on
- rebooting clients
- running `ipconfig /release` and `ipconfig /renew` on Windows
- waiting for leases to expire

## 12. Why Re-Enabling Router DHCP Fixed Things

Re-enabling router DHCP may be necessary as a temporary recovery step when leases, hostnames, or local DNS state get stale.

Use this when clients stop resolving correctly, devices disappear, or AdGuard/router lease state looks inconsistent:

1. Re-enable router DHCP temporarily.
2. Let clients refresh or renew their leases.
3. Confirm devices regain valid IP, gateway, and DNS settings.
4. Re-check the Pi IP and make sure only the intended Ethernet IP is being used.
5. Move back to AdGuard DHCP only after the network state is clean.

Why this helps:

- clients renewed leases
- devices re-registered hostnames
- the router rebuilt ARP/DHCP/local DNS tables
- AdGuard started seeing usable lease or reverse-DNS data
- stale DNS settings were flushed by reconnecting clients

A router reboot alone does **not** always force every client to request a new DHCP lease. Clients may keep their existing lease until it expires.

## 13. Client Names / Hostname Resolution

Best option for visibility:

```text
AdGuard DHCP owns the lease table
```

This lets AdGuard map:

```text
192.168.1.123 → iPhone
192.168.1.124 → MacBook
```

If keeping router DHCP instead, hostname resolution depends on whether the router provides reverse DNS/PTR records.

Test reverse DNS:

```bash
dig -x <CLIENT-IP> @<ROUTER-IP>
```

If the router returns no hostname, AdGuard cannot reliably show client names using router DHCP.

## 14. Troubleshooting: Connected but Internet Unavailable

Most common cause: AdGuard DHCP is handing out the wrong gateway.

Correct:

```text
Gateway: router IP
DNS:     Pi IP
```

Wrong:

```text
Gateway: Pi IP
DNS:     Pi IP
```

unless the Pi is configured as a router, which it is not in this setup.

Check on a client:

Windows:

```cmd
ipconfig /all
```

macOS/Linux:

```bash
ip route
netstat -rn
```

Look for:

```text
Default gateway: <router IP>
DNS server:      <Pi IP>
```

## 15. Troubleshooting: Cannot Access Router UI

Find the default gateway from a client.

macOS/Linux:

```bash
ip route | grep default
netstat -rn | grep default
```

Windows:

```cmd
ipconfig
```

Open the default gateway IP in a browser.

If gateway is blank or wrong, AdGuard DHCP is misconfigured.

## 16. Troubleshooting: Slow DNS / Slow Internet

Check AdGuard dashboard average processing time.

General targets:

```text
< 50 ms: good
50–150 ms: okay
> 200 ms: investigate
```

Stabilization steps:

- Use reliable upstream DNS.
- Enable parallel requests.
- Use a small set of blocklists first.
- Avoid router/Pi DNS loops.
- Check whether IPv6 DNS is bypassing AdGuard.
- Keep the Pi wired by Ethernet.

Minimal blocklist approach while troubleshooting:

```text
AdGuard DNS filter
OISD Basic or OISD Full
```

## 17. IPv6 Note

IPv6 can bypass AdGuard if the router advertises a separate IPv6 DNS server.

For initial stability:

- disable IPv6 DNS advertisement on the router, or
- set IPv6 DNS to the Pi's IPv6 address if you are intentionally supporting IPv6.

Validate DNS from clients:

```bash
nslookup google.com
```

The DNS server should be the Pi.

## 18. Apartment Ethernet Handoff

If replacing the Spectrum modem with the apartment Ethernet jack, the AdGuard setup usually does not need to change.

Old:

```text
Spectrum modem → Router WAN
```

New:

```text
Apartment Ethernet → Router WAN
```

Unchanged:

```text
Router LAN subnet
Pi IP
AdGuard DHCP
AdGuard DNS
Client leases
```

This works because the change is on the router's WAN side. The LAN side remains your private network.

Watch for subnet overlap:

```text
Apartment network: 192.168.1.0/24
Your router LAN:   192.168.1.0/24
```

Bad. Change your router LAN to something less common:

```text
192.168.50.0/24
192.168.77.0/24
```

Possible apartment-network issues:

- captive portal
- MAC registration
- apartment IT needing the router WAN MAC
- double NAT, which is usually fine for normal browsing but can matter for inbound services/gaming/VPNs

## 19. Ethernet Cable Notes

For router-to-Pi and modem/apartment-Ethernet-to-router:

- Cat5e is sufficient for 1 Gbps.
- Cat6 is a good default if buying new.
- Cat8 works but will not improve DNS or Pi performance.

The Raspberry Pi 4 Ethernet port is 1 Gbps, so anything above reliable Cat5e is mostly extra headroom.

## Rebuild Checklist

1. Flash Raspberry Pi OS Lite with Raspberry Pi Imager.
2. Enable SSH.
3. Do not configure Wi-Fi unless Ethernet is unavailable.
4. Boot Pi on Ethernet.
5. Update OS.
6. Check Pi IP.
7. Confirm the Pi is using the Ethernet IP, not both Wi-Fi and Ethernet IPs.
8. Make Pi IP static/reserved and outside DHCP pool.
9. Install AdGuard Home.
10. Check installed version from CLI.
11. Open AdGuard web UI.
12. Configure upstream, bootstrap, and fallback DNS.
13. Test DNS manually.
14. Configure AdGuard DHCP.
15. Confirm gateway is router IP and DNS is Pi IP.
16. Disable router DHCP.
17. Renew client leases.
18. If leases or hostname state look stale, temporarily re-enable router DHCP to refresh leases, then return to the intended single-DHCP setup.
19. Confirm clients appear individually in AdGuard.
20. Test router UI access via default gateway.
21. Test WAN handoff if switching from modem to apartment Ethernet.

## Lessons Learned

- The Pi should be configured Ethernet-only for this setup unless Wi-Fi is required.
- Configuring Wi-Fi during initial setup can create a two-IP problem later: one IP for `wlan0` and one IP for `eth0`.
- The Pi IP should be static and outside the AdGuard DHCP range.
- Router DHCP and AdGuard DHCP should not both stay enabled long-term.
- Temporarily re-enabling router DHCP can help refresh stale leases and rebuild local network state.
- AdGuard DHCP improves client visibility because AdGuard owns the lease table.
- The router should remain the gateway even when AdGuard is DHCP.
- Changing DHCP can fix stale state that a router reboot does not clear.
- Moving from a modem to apartment Ethernet should be a WAN-side change only if the router LAN stays unchanged.
- DNS filtering and client visibility are separate problems.
- Keep a recovery path to the router during DHCP changes.
