const mockData = {
    systemAccounts: [
        { id: 1, adminUser: "Alex", email: "alex.chen@client.com.au", status: "Active", loginCount: 0, lastLoginTime: "", lastLoginIp: "", currentLoginIp: "", created: "02/10/2025 12:32:36" },
        { id: 2, adminUser: "Steven", email: "steven.gao@client.com.au", status: "Active", loginCount: 6, lastLoginTime: "08/10/2025 13:14:02", lastLoginIp: "163.53.18.24", currentLoginIp: "163.53.18.24", created: "23/09/2025 12:58:56" },
        { id: 3, adminUser: "Billy", email: "billy.yan@client.com.au", status: "Active", loginCount: 1, lastLoginTime: "", lastLoginIp: "", currentLoginIp: "103.181.44.33", created: "23/09/2025 12:44:30" },
        { id: 4, adminUser: "Scott", email: "scott@greendeal.com.au", status: "Active", loginCount: 9, lastLoginTime: "18/10/2025 19:33:37", lastLoginIp: "122.150.144.100", currentLoginIp: "124.254.69.86", created: "01/09/2025 11:16:03" },
        { id: 5, adminUser: "Nina_Liu", email: "nina.liu@greendeal.com.au", status: "Active", loginCount: 1, lastLoginTime: "", lastLoginIp: "", currentLoginIp: "124.254.69.86", created: "16/06/2025 12:04:39" },
        { id: 6, adminUser: "Leon_Hu", email: "leon.hu@discoverenergy.com.au", status: "Active", loginCount: 13, lastLoginTime: "07/04/2025 11:40:25", lastLoginIp: "124.254.69.86", currentLoginIp: "124.254.69.86", created: "02/09/2024 01:11:22" },
        { id: 7, adminUser: "Andrew", email: "andrew.zhao@osw.energy", status: "Active", loginCount: 2, lastLoginTime: "02/09/2024 01:08:33", lastLoginIp: "124.254.69.86", currentLoginIp: "124.254.69.86", created: "29/08/2024 17:45:43" },
        { id: 8, adminUser: "James", email: "james.qi@osw.energy", status: "Active", loginCount: 0, lastLoginTime: "", lastLoginIp: "", currentLoginIp: "", created: "29/08/2024 17:39:42" },
        { id: 9, adminUser: "Beth", email: "beth.corcoran@discoverenergy.com.au", status: "Active", loginCount: 43, lastLoginTime: "06/11/2025 14:52:58", lastLoginIp: "124.254.69.86", currentLoginIp: "124.254.69.86", created: "09/02/2024 15:22:39" },
        { id: 10, adminUser: "Marcos", email: "marcos@client.com.au", status: "Active", loginCount: 10, lastLoginTime: "18/10/2024 18:00:57", lastLoginIp: "103.172.81.131", currentLoginIp: "209.141.57.171", created: "28/11/2023 19:18:59" },
        { id: 11, adminUser: "CloudIT", email: "cloud@client.com.au", status: "Active", loginCount: 1, lastLoginTime: "", lastLoginIp: "", currentLoginIp: "112.2.136.136", created: "04/08/2023 11:59:44" },
        { id: 12, adminUser: "Wilson", email: "wilson.huang@discoverenergy.com.au", status: "Active", loginCount: 8, lastLoginTime: "05/04/2023 14:01:38", lastLoginIp: "124.254.69.86", currentLoginIp: "124.254.69.86", created: "01/02/2023 12:29:25" }
    ],
    dataAccess: [
        { id: 1, username: "Alex", email: "alex.chen@client.com.au", status: "Active", loginCount: 0, lastLoginTime: "", lastLoginIp: "", currentLoginIp: "", created: "02/10/2025 12:32:36" },
        { id: 2, username: "Steven", email: "steven.gao@client.com.au", status: "Active", loginCount: 6, lastLoginTime: "08/10/2025 13:14:02", lastLoginIp: "163.53.18.24", currentLoginIp: "163.53.18.24", created: "23/09/2025 12:58:56" },
        { id: 3, username: "Billy", email: "billy.yan@client.com.au", status: "Active", loginCount: 1, lastLoginTime: "", lastLoginIp: "", currentLoginIp: "103.181.44.33", created: "23/09/2025 12:44:30" },
        { id: 4, username: "Scott", email: "scott@greendeal.com.au", status: "Active", loginCount: 9, lastLoginTime: "18/10/2025 19:33:37", lastLoginIp: "122.150.144.100", currentLoginIp: "124.254.69.86", created: "01/09/2025 11:16:03" },
        { id: 5, username: "Nina_Liu", email: "nina.liu@greendeal.com.au", status: "Active", loginCount: 1, lastLoginTime: "", lastLoginIp: "", currentLoginIp: "124.254.69.86", created: "16/06/2025 12:04:39" },
        { id: 6, username: "Leon_Hu", email: "leon.hu@discoverenergy.com.au", status: "Active", loginCount: 13, lastLoginTime: "07/04/2025 11:40:25", lastLoginIp: "124.254.69.86", currentLoginIp: "124.254.69.86", created: "02/09/2024 01:11:22" },
        { id: 7, username: "Andrew", email: "andrew.zhao@osw.energy", status: "Active", loginCount: 2, lastLoginTime: "02/09/2024 01:08:33", lastLoginIp: "124.254.69.86", currentLoginIp: "124.254.69.86", created: "29/08/2024 17:45:43" },
        { id: 8, username: "James", email: "james.qi@osw.energy", status: "Active", loginCount: 0, lastLoginTime: "", lastLoginIp: "", currentLoginIp: "", created: "29/08/2024 17:39:42" },
        { id: 9, username: "Beth", email: "beth.corcoran@discoverenergy.com.au", status: "Active", loginCount: 43, lastLoginTime: "06/11/2025 14:52:58", lastLoginIp: "124.254.69.86", currentLoginIp: "124.254.69.86", created: "09/02/2024 15:22:39" },
        { id: 10, username: "Marcos", email: "marcos@client.com.au", status: "Active", loginCount: 10, lastLoginTime: "18/10/2024 18:00:57", lastLoginIp: "103.172.81.131", currentLoginIp: "209.141.57.171", created: "28/11/2023 19:18:59" },
        { id: 11, username: "CloudIT", email: "cloud@client.com.au", status: "Active", loginCount: 1, lastLoginTime: "", lastLoginIp: "", currentLoginIp: "112.2.136.136", created: "04/08/2023 11:59:44" },
        { id: 12, username: "Wilson", email: "wilson.huang@discoverenergy.com.au", status: "Active", loginCount: 8, lastLoginTime: "05/04/2023 14:01:38", lastLoginIp: "124.254.69.86", currentLoginIp: "124.254.69.86", created: "01/02/2023 12:29:25" }
    ],
    clients: [
        { id: 1, userName: "John Doe", email: "john.doe@solarnaturally.com", company: "Solar Naturally Pty Ltd", mobile: "0412345678", status: "Active", loginCount: 12, lastLoginTime: "2026-05-10 09:30:00", lastLoginIp: "192.168.1.1", currentLoginIp: "192.168.1.1", created: "2026-01-25" },
        { id: 2, userName: "Jane Smith", email: "jane.smith@gpower.com", company: "GPOWER PTY LTD", mobile: "0487654321", status: "Inactive", loginCount: 3, lastLoginTime: "2026-04-15 14:20:00", lastLoginIp: "203.0.113.5", currentLoginIp: "", created: "2026-02-25" },
        { id: 3, userName: "Mike Ross", email: "mike.ross@regenpower.com", company: "Regen Power Pty Ltd", mobile: "0422334455", status: "Active", loginCount: 45, lastLoginTime: "2026-05-11 08:45:00", lastLoginIp: "10.0.0.5", currentLoginIp: "10.0.0.5", created: "2026-01-24" },
        { id: 4, userName: "Sarah Connor", email: "sarah.connor@connectsolar.com", company: "Connect Solar Cycle Team", mobile: "0499887766", status: "Active", loginCount: 8, lastLoginTime: "2026-05-09 16:10:00", lastLoginIp: "172.16.0.2", currentLoginIp: "172.16.0.2", created: "2026-02-24" },
        { id: 5, userName: "David Brown", email: "david.brown@greenenergy.com", company: "Green Energy Co", mobile: "0455667788", status: "Active", loginCount: 22, lastLoginTime: "2026-05-10 11:00:00", lastLoginIp: "192.168.1.10", currentLoginIp: "192.168.1.10", created: "2026-03-02" },
        { id: 6, userName: "Emily White", email: "emily.white@bluesky.com", company: "Blue Sky Solar", mobile: "0411223344", status: "Inactive", loginCount: 0, lastLoginTime: "", lastLoginIp: "", currentLoginIp: "", created: "2026-03-06" },
        { id: 7, userName: "Chris Green", email: "chris.green@sunshinestate.com", company: "Sunshine State Power", mobile: "0433445566", status: "Active", loginCount: 5, lastLoginTime: "2026-05-08 10:15:00", lastLoginIp: "203.0.113.10", currentLoginIp: "203.0.113.10", created: "2026-03-11" },
        { id: 8, userName: "Anna Black", email: "anna.black@nordicwind.com", company: "Nordic Wind", mobile: "0477889900", status: "Active", loginCount: 18, lastLoginTime: "2026-05-11 09:00:00", lastLoginIp: "10.0.0.8", currentLoginIp: "10.0.0.8", created: "2026-03-13" },
        { id: 9, userName: "Tom Blue", email: "tom.blue@tokyoelectric.com", company: "Tokyo Electric", mobile: "0466554433", status: "Active", loginCount: 30, lastLoginTime: "2026-05-10 13:45:00", lastLoginIp: "172.16.0.5", currentLoginIp: "172.16.0.5", created: "2026-03-16" },
        { id: 10, userName: "Lisa Grey", email: "lisa.grey@kiwipower.com", company: "Kiwi Power", mobile: "0400112233", status: "Active", loginCount: 15, lastLoginTime: "2026-05-09 15:30:00", lastLoginIp: "192.168.1.20", currentLoginIp: "192.168.1.20", created: "2026-03-21" },
        { id: 11, userName: "Diana Prince", email: "diana.prince@solarnaturally.com", company: "Solar Naturally Pty Ltd", mobile: "0432165987", status: "Active", loginCount: 9, lastLoginTime: "2026-05-06 09:40:00", lastLoginIp: "172.16.0.10", currentLoginIp: "172.16.0.10", created: "2026-04-10" },
        { id: 12, userName: "Barry Allen", email: "barry.allen@gpower.com", company: "GPOWER PTY LTD", mobile: "0478951236", status: "Inactive", loginCount: 2, lastLoginTime: "2026-04-20 16:50:00", lastLoginIp: "192.168.1.30", currentLoginIp: "", created: "2026-04-15" },
        { id: 13, userName: "Arthur Curry", email: "arthur.curry@regenpower.com", company: "Regen Power Pty Ltd", mobile: "0455666777", status: "Active", loginCount: 7, lastLoginTime: "2026-05-12 10:00:00", lastLoginIp: "10.0.0.6", currentLoginIp: "10.0.0.6", created: "2026-04-16" },
        { id: 14, userName: "Hal Jordan", email: "hal.jordan@connectsolar.com", company: "Connect Solar Cycle Team", mobile: "0499888999", status: "Active", loginCount: 11, lastLoginTime: "2026-05-11 14:00:00", lastLoginIp: "172.16.0.3", currentLoginIp: "172.16.0.3", created: "2026-04-17" },
        { id: 15, userName: "Victor Stone", email: "victor.stone@futureenergy.com", company: "Future Energy Startups", mobile: "0411222333", status: "Active", loginCount: 20, lastLoginTime: "2026-05-10 12:30:00", lastLoginIp: "192.168.1.40", currentLoginIp: "192.168.1.40", created: "2026-04-18" },
        { id: 16, userName: "Oliver Queen", email: "oliver.queen@newwave.com", company: "New Wave Solar", mobile: "0488777666", status: "Inactive", loginCount: 0, lastLoginTime: "", lastLoginIp: "", currentLoginIp: "", created: "2026-04-19" },
        { id: 17, userName: "Natasha Romanoff", email: "natasha@ecofriendly.com", company: "Eco Friendly Solutions", mobile: "0466555444", status: "Active", loginCount: 14, lastLoginTime: "2026-05-09 11:15:00", lastLoginIp: "203.0.113.30", currentLoginIp: "203.0.113.30", created: "2026-04-20" },
        { id: 18, userName: "Tony Stark", email: "tony.stark@tokyoelectric.com", company: "Tokyo Electric", mobile: "0433222111", status: "Active", loginCount: 100, lastLoginTime: "2026-05-12 09:00:00", lastLoginIp: "10.0.0.99", currentLoginIp: "10.0.0.99", created: "2026-04-21" },
        { id: 19, userName: "Steve Rogers", email: "steve.rogers@nordicwind.com", company: "Nordic Wind", mobile: "0477888999", status: "Active", loginCount: 50, lastLoginTime: "2026-05-11 08:30:00", lastLoginIp: "172.16.0.50", currentLoginIp: "172.16.0.50", created: "2026-04-22" },
        { id: 20, userName: "Bruce Banner", email: "bruce.banner@greenenergy.com", company: "Green Energy Co", mobile: "0422111333", status: "Active", loginCount: 5, lastLoginTime: "2026-05-10 15:45:00", lastLoginIp: "192.168.1.50", currentLoginIp: "192.168.1.50", created: "2026-04-23" }
    ], 
    companies: [
        // Approved Data (Active/Inactive) - Page 1
        { id: 1, companyName: "Solar Naturally Pty Ltd", industry: "Energy Retailer", nation: "Australia", status: "Active", abn: "82435245", address: "55 RAE ST, BELCONNEN ACT 2617", accounts: 3, created: "2026-01-23" },
        { id: 2, companyName: "GPOWER PTY LTD", industry: "Commercial & Industrial", nation: "USA", status: "Inactive", abn: "2343332", address: "123 MAIN ST, PORTLAND OR 97204", accounts: 1, created: "2026-02-23" },
        { id: 3, companyName: "Regen Power Pty Ltd", industry: "Energy Retailer", nation: "Spain", status: "Active", abn: "6534236", address: "VIA ROMA, MADRID", accounts: 3, created: "2026-01-23" },
        { id: 4, companyName: "Connect Solar Cycle Team", industry: "Commercial & Industrial", nation: "Germany", status: "Inactive", abn: "1324134", address: "BERLINER STR, BERLIN", accounts: 23, created: "2026-02-23" },
        { id: 5, companyName: "Green Energy Co", industry: "Energy Retailer", nation: "Australia", status: "Active", abn: "99887766", address: "123 PITT ST, SYDNEY NSW 2000", accounts: 5, created: "2026-03-01" },
        
        // Approved Data (Active/Inactive) - Page 2
        { id: 6, companyName: "Blue Sky Solar", industry: "Commercial & Industrial", nation: "USA", status: "Active", abn: "11223344", address: "456 MARKET ST, SAN FRANCISCO CA 94103", accounts: 12, created: "2026-03-05" },
        { id: 7, companyName: "Sunshine State Power", industry: "Energy Retailer", nation: "Australia", status: "Inactive", abn: "55667788", address: "789 QUEEN ST, BRISBANE QLD 4000", accounts: 2, created: "2026-03-10" },
        { id: 8, companyName: "Nordic Wind", industry: "Energy Retailer", nation: "Netherlands", status: "Active", abn: "44332211", address: "PORT OF ROTTERDAM", accounts: 8, created: "2026-03-12" },
        { id: 9, companyName: "Tokyo Electric", industry: "Commercial & Industrial", nation: "Brazil", status: "Active", abn: "99008877", address: "AV PAULISTA, SAO PAULO", accounts: 45, created: "2026-03-15" },
        { id: 10, companyName: "Kiwi Power", industry: "Energy Retailer", nation: "Australia", status: "Active", abn: "77665544", address: "COLLINS ST, MELBOURNE VIC", accounts: 4, created: "2026-03-20" },

        // Awaiting Confirmation Data (Pending)
        { id: 11, companyName: "Future Energy Startups", industry: "Technology", nation: "Australia", status: "Pending", abn: "12312312", address: "100 STARTUP WAY, MELBOURNE VIC 3000", accounts: 1, created: "2026-04-01" },
        { id: 12, companyName: "New Wave Solar", industry: "Energy Retailer", nation: "Australia", status: "Pending", abn: "32132132", address: "200 BEACH RD, PERTH WA 6000", accounts: 0, created: "2026-04-02" },
        { id: 13, companyName: "Eco Friendly Solutions", industry: "Commercial & Industrial", nation: "Canada", status: "Pending", abn: "45645645", address: "YONGE ST, TORONTO", accounts: 1, created: "2026-04-03" },

        // Additional Mock Data for Testing (Based on div list, mapped to valid countries)
        { id: 14, companyName: "Solar Naturally Pty Ltd", industry: "Energy Retailer", nation: "Germany", status: "Active", abn: "DE82435245", address: "MUNICH TECH PARK", accounts: 5, created: "2026-04-05" },
        { id: 15, companyName: "GPOWER PTY LTD", industry: "Commercial & Industrial", nation: "Canada", status: "Active", abn: "CA2343332", address: "VANCOUVER HARBOUR", accounts: 12, created: "2026-04-06" },
        { id: 16, companyName: "Regen Power Pty Ltd", industry: "Energy Retailer", nation: "Brazil", status: "Active", abn: "BR6534236", address: "RIO DE JANEIRO", accounts: 8, created: "2026-04-07" },
        { id: 17, companyName: "Connect Solar Cycle Team", industry: "Commercial & Industrial", nation: "Netherlands", status: "Pending", abn: "NL1324134", address: "AMSTERDAM CENTRAL", accounts: 2, created: "2026-04-08" },
        { id: 18, companyName: "Green Energy Co", industry: "Energy Retailer", nation: "USA", status: "Active", abn: "US99887766", address: "AUSTIN, TEXAS", accounts: 6, created: "2026-04-09" },
        { id: 19, companyName: "Blue Sky Solar", industry: "Commercial & Industrial", nation: "Spain", status: "Active", abn: "ES11223344", address: "BARCELONA PORT", accounts: 4, created: "2026-04-10" },
        { id: 20, companyName: "Sunshine State Power", industry: "Energy Retailer", nation: "Germany", status: "Inactive", abn: "DE55667788", address: "HAMBURG DOCKS", accounts: 3, created: "2026-04-11" },
        { id: 21, companyName: "Nordic Wind", industry: "Energy Retailer", nation: "Germany", status: "Active", abn: "DE44332211", address: "BREMEN WIND PARK", accounts: 9, created: "2026-04-12" },
        { id: 22, companyName: "Tokyo Electric", industry: "Commercial & Industrial", nation: "USA", status: "Pending", abn: "US99008877", address: "NEW YORK, NY", accounts: 1, created: "2026-04-13" },
        { id: 23, companyName: "Kiwi Power", industry: "Energy Retailer", nation: "USA", status: "Active", abn: "US77665544", address: "SEATTLE, WA", accounts: 7, created: "2026-04-14" },
        { id: 24, companyName: "Future Energy Startups", industry: "Technology", nation: "Netherlands", status: "Active", abn: "NL12312312", address: "EINDHOVEN TECH CAMPUS", accounts: 5, created: "2026-04-15" },
        { id: 25, companyName: "New Wave Solar", industry: "Energy Retailer", nation: "Brazil", status: "Inactive", abn: "BR32132132", address: "SALVADOR, BAHIA", accounts: 2, created: "2026-04-16" },
        { id: 26, companyName: "Eco Friendly Solutions", industry: "Commercial & Industrial", nation: "Spain", status: "Active", abn: "ES45645645", address: "SEVILLE SOLAR PARK", accounts: 10, created: "2026-04-17" },
        { id: 27, companyName: "Solar Naturally Pty Ltd", industry: "Energy Retailer", nation: "USA", status: "Active", abn: "US82435245", address: "PHOENIX, AZ", accounts: 15, created: "2026-04-18" },
        { id: 28, companyName: "GPOWER PTY LTD", industry: "Commercial & Industrial", nation: "Australia", status: "Active", abn: "AU2343332", address: "ADELAIDE SA", accounts: 6, created: "2026-04-19" },
        { id: 29, companyName: "Regen Power Pty Ltd", industry: "Energy Retailer", nation: "Germany", status: "Active", abn: "DE6534236", address: "FRANKFURT", accounts: 11, created: "2026-04-20" },
        { id: 30, companyName: "Connect Solar Cycle Team", industry: "Commercial & Industrial", nation: "Spain", status: "Pending", abn: "ES1324134", address: "VALENCIA", accounts: 0, created: "2026-04-21" },
        { id: 31, companyName: "Green Energy Co", industry: "Energy Retailer", nation: "Canada", status: "Active", abn: "CA99887766", address: "CALGARY, AB", accounts: 8, created: "2026-04-22" },
        { id: 32, companyName: "Blue Sky Solar", industry: "Commercial & Industrial", nation: "Netherlands", status: "Active", abn: "NL11223344", address: "UTRECHT", accounts: 4, created: "2026-04-23" },
        { id: 33, companyName: "Sunshine State Power", industry: "Energy Retailer", nation: "Brazil", status: "Active", abn: "BR55667788", address: "CURITIBA", accounts: 14, created: "2026-04-24" }
    ],
    // New Data Access Mock Data
    accessNodes: [
        { id: 1, name: 'Home Storage Cluster A', vpp: 'State Grid VPP', status: 'online', type: 'EDGE', inverters: 5, invertersOnline: 5, invertersOffline: 0, invertersDisconnected: 0, batteries: 10, batteriesOnline: 9, batteriesOffline: 1, batteriesDisconnected: 0, ip: '192.168.1.100', country: 'Australia' },
        { id: 6, name: 'Madrid Commercial Roof', vpp: 'EU Energy Hub', status: 'online', type: 'CLOUD', inverters: 45, invertersOnline: 45, invertersOffline: 0, invertersDisconnected: 0, batteries: 0, batteriesOnline: 0, batteriesOffline: 0, batteriesDisconnected: 0, vendor: 'SMA', appKey: 'manta_app_789', appAccess: 'sec_9h44c5e9f3g7', country: 'Spain', company: 'Connect Solar Cycle Team' },
        { id: 7, name: 'Amsterdam Distribution Center', vpp: 'EU Energy Hub', status: 'offline', type: 'CLOUD', inverters: 80, invertersOnline: 10, invertersOffline: 60, invertersDisconnected: 10, batteries: 20, batteriesOnline: 5, batteriesOffline: 10, batteriesDisconnected: 5, vendor: 'SolarEdge', appKey: 'manta_app_012', appAccess: 'sec_1j55d6f0g4h8', country: 'Netherlands', company: 'Blue Sky Solar' },
        { id: 8, name: 'Sydney Residential VPP', vpp: 'Ausgrid VPP', status: 'online', type: 'CLOUD', inverters: 50, invertersOnline: 50, invertersOffline: 0, invertersDisconnected: 0, batteries: 50, batteriesOnline: 48, batteriesOffline: 2, batteriesDisconnected: 0, vendor: 'Tesla', appKey: 'manta_app_aus1', appAccess: 'sec_aus1_tesla', country: 'Australia', company: 'Energy Australia' },
        { id: 9, name: 'Melbourne Commercial Hub', vpp: 'CitiPower Flex', status: 'online', type: 'CLOUD', inverters: 30, invertersOnline: 29, invertersOffline: 1, invertersDisconnected: 0, batteries: 0, batteriesOnline: 0, batteriesOffline: 0, batteriesDisconnected: 0, vendor: 'Fronius', appKey: 'manta_app_aus2', appAccess: 'sec_aus2_fronius', country: 'Australia', company: 'Origin Energy' },
        { id: 10, name: 'Brisbane Solar Estate', vpp: 'Energex Community', status: 'online', type: 'CLOUD', inverters: 60, invertersOnline: 58, invertersOffline: 2, batteries: 20, batteriesOnline: 20, batteriesOffline: 0, vendor: 'Enphase', appKey: 'manta_app_aus3', appAccess: 'sec_aus3_enphase', country: 'Australia', company: 'AGL Energy' },
        // SCADA and Edge Data for Cloud Countries
        { id: 19, name: 'Outback Solar SCADA', vpp: 'NEM Control', status: 'online', type: 'SCADA', inverters: 200, invertersOnline: 195, invertersOffline: 5, batteries: 50, batteriesOnline: 48, batteriesOffline: 2, ip: '192.168.50.1', country: 'Australia', vendor: 'Schneider' },
    ],
    vpps: [],
    assignedDevices: [],
    devices: [
        { id: 101, sn: 'INV-2024-001', vendor: 'Sungrow', type: 'Inverter', status: 'online', userName: 'Alice Green', vpp: 'State Grid VPP', nmi: '41020000001', dnsp: 'Ausgrid', retailer: 'AGL', phone: '+1 555-0201', email: 'alice@example.com', address: '321 Green Way' },
        { id: 102, sn: 'BAT-2024-002', vendor: 'CATL', type: 'Battery', status: 'online', userName: 'Charlie Black', vpp: 'Virtual Power', nmi: '41020000002', dnsp: 'Endeavour', retailer: 'Origin', phone: '+1 555-0202', email: 'charlie@example.com', address: '654 Energy Blvd' },
        { id: 103, sn: 'INV-2024-003', vendor: 'Huawei', type: 'Inverter', status: 'offline', userName: 'David White', vpp: '-', nmi: '41020000003', dnsp: 'Energex', retailer: 'Red Energy', phone: '+1 555-0203', email: 'david@example.com', address: '987 Volt Rd' },
        { id: 104, sn: 'BAT-2024-004', vendor: 'BYD', type: 'Battery', status: 'online', userName: 'Eva Blue', vpp: 'State Grid VPP', nmi: '41020000004', dnsp: 'Ausgrid', retailer: 'EnergyAustralia', phone: '+1 555-0204', email: 'eva@example.com', address: '147 Ampere Ct' },
        { id: 105, sn: 'INV-2024-005', vendor: 'Sungrow', type: 'Inverter', status: 'online', userName: 'Frank Red', vpp: 'Virtual Power', nmi: '41020000005', dnsp: 'CitiPower', retailer: 'Powershop', phone: '+1 555-0205', email: 'frank@example.com', address: '258 Ohm Pl' },
    ]
};
