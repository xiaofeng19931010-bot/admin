// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Default view
    switchView('system-accounts');
    
    // Render initial data
    renderSystemAccounts();
    renderDataAccessDashboard();
    renderClients(); // Will render empty table if data is empty
    renderCompanies();
});

// Navigation Logic
function switchView(viewId) {
    // Hide all views
    document.getElementById('view-system-accounts').classList.add('hidden');
    document.getElementById('view-data-access').classList.add('hidden');
    document.getElementById('view-clients').classList.add('hidden');
    document.getElementById('view-companies').classList.add('hidden');
    
    // Show selected view
    document.getElementById(`view-${viewId}`).classList.remove('hidden');
    
    // Update Sidebar Active State
    const navItems = ['nav-companies', 'nav-clients', 'nav-system-accounts', 'nav-data-access'];
    navItems.forEach(id => {
        const el = document.getElementById(id);
        if (id === `nav-${viewId}`) {
            el.classList.add('text-manta-primary', 'bg-green-50');
            el.classList.remove('text-gray-600', 'hover:bg-green-50');
            // Icon color handling if needed
        } else {
            el.classList.remove('text-manta-primary', 'bg-green-50');
            el.classList.add('text-gray-600', 'hover:bg-green-50');
        }
    });

    // Update Breadcrumb
    const titles = {
        'system-accounts': 'System Accounts',
        'data-access': 'Data Platform',
        'clients': 'Clients',
        'companies': 'Companies'
    };
    document.getElementById('page-title').textContent = titles[viewId];

    // Control Action Button Visibility
    const companiesActionBtn = document.getElementById('companies-action-btn');
    if (companiesActionBtn) {
        if (viewId === 'companies') {
            companiesActionBtn.classList.remove('hidden');
        } else {
            companiesActionBtn.classList.add('hidden');
        }
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.remove('-translate-x-full');
    } else {
        sidebar.classList.add('-translate-x-full'); // Assuming you add this class or similar for mobile
        // For simple toggling on mobile we might need absolute positioning or different logic
        // But for this prototype, let's just leave it simple. 
        // Tailwind 'hidden' for mobile might be better controlled via classes in HTML.
    }
}


// Rendering Logic
let currentSystemPage = 1;
let systemPageSize = 10;

function changeSystemPage(delta) {
    currentSystemPage += delta;
    renderSystemAccounts();
}

function goToSystemPage(page) {
    const p = parseInt(page);
    if (!isNaN(p)) {
        currentSystemPage = p;
        renderSystemAccounts();
    }
}

function renderSystemAccounts() {
    const tbody = document.getElementById('system-accounts-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const data = mockData.systemAccounts;
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / systemPageSize);

    if (currentSystemPage < 1) currentSystemPage = 1;
    if (currentSystemPage > totalPages && totalPages > 0) currentSystemPage = totalPages;

    const startIndex = (currentSystemPage - 1) * systemPageSize;
    const endIndex = startIndex + systemPageSize;
    const pageData = data.slice(startIndex, endIndex);

    // Update Pagination UI
    const totalCountEl = document.getElementById('sa-total-count');
    const currentPageEl = document.getElementById('sa-current-page');
    const prevBtn = document.getElementById('sa-prev-page');
    const nextBtn = document.getElementById('sa-next-page');
    const gotoInput = document.getElementById('sa-goto-page');

    if (totalCountEl) totalCountEl.textContent = totalItems;
    if (currentPageEl) currentPageEl.textContent = currentSystemPage;
    if (gotoInput) gotoInput.value = currentSystemPage;
    
    if (prevBtn) prevBtn.disabled = currentSystemPage <= 1;
    if (nextBtn) nextBtn.disabled = currentSystemPage >= totalPages;

    if (pageData.length === 0) {
        for(let i=0; i<systemPageSize; i++) {
             const tr = document.createElement('tr');
             tr.className = 'hover:bg-gray-50 transition-colors h-12';
             tr.innerHTML = `<td colspan="9" class="px-6 py-4 border-b border-gray-100"></td>`;
             tbody.appendChild(tr);
        }
    } else {
        pageData.forEach((item) => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 transition-colors border-b border-gray-50';
            tr.innerHTML = `
                <td class="px-6 py-4 font-medium text-gray-900">${item.adminUser}</td>
                <td class="px-6 py-4">${item.email}</td>
                <td class="px-6 py-4">
                     <span class="px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }">
                        ${item.status}
                    </span>
                </td>
                <td class="px-6 py-4">${item.loginCount}</td>
                <td class="px-6 py-4 text-xs text-gray-500">${item.lastLoginTime || '-'}</td>
                <td class="px-6 py-4 text-xs text-gray-500">${item.lastLoginIp || '-'}</td>
                <td class="px-6 py-4 text-xs text-gray-500">${item.currentLoginIp || '-'}</td>
                <td class="px-6 py-4 text-xs text-gray-500">${item.created}</td>
                <td class="px-6 py-4">
                    <button onclick="openEditAdminModal(${item.id})" class="text-gray-400 hover:text-manta-primary transition-colors">
                        <i class="far fa-edit"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

let currentClientPage = 1;
let clientPageSize = 10;

function changeClientPage(delta) {
    currentClientPage += delta;
    renderClients();
}

function goToClientPage(page) {
    const p = parseInt(page);
    if (!isNaN(p)) {
        currentClientPage = p;
        renderClients();
    }
}

function renderClients() {
    const tbody = document.getElementById('clients-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    const data = mockData.clients;
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / clientPageSize);

    if (currentClientPage < 1) currentClientPage = 1;
    if (currentClientPage > totalPages && totalPages > 0) currentClientPage = totalPages;

    const startIndex = (currentClientPage - 1) * clientPageSize;
    const endIndex = startIndex + clientPageSize;
    const pageData = data.slice(startIndex, endIndex);

    // Update Pagination UI
    const totalCountEl = document.getElementById('cl-total-count');
    const currentPageEl = document.getElementById('cl-current-page');
    const prevBtn = document.getElementById('cl-prev-page');
    const nextBtn = document.getElementById('cl-next-page');
    const gotoInput = document.getElementById('cl-goto-page');

    if (totalCountEl) totalCountEl.textContent = totalItems;
    if (currentPageEl) currentPageEl.textContent = currentClientPage;
    if (gotoInput) gotoInput.value = currentClientPage;
    
    if (prevBtn) prevBtn.disabled = currentClientPage <= 1;
    if (nextBtn) nextBtn.disabled = currentClientPage >= totalPages;

    if (pageData.length === 0) {
        for(let i=0; i<clientPageSize; i++) {
             const tr = document.createElement('tr');
             tr.className = 'hover:bg-gray-50 transition-colors h-12';
             tr.innerHTML = `<td colspan="11" class="px-6 py-4 border-b border-gray-100"></td>`;
             tbody.appendChild(tr);
        }
    } else {
        pageData.forEach((item) => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 transition-colors border-b border-gray-50';
            tr.innerHTML = `
                <td class="px-6 py-4 font-medium text-gray-900">${item.userName}</td>
                <td class="px-6 py-4">${item.email}</td>
                <td class="px-6 py-4">${item.company}</td>
                <td class="px-6 py-4">${item.mobile}</td>
                <td class="px-6 py-4">
                     <span class="px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        item.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'
                    }">
                        ${item.status}
                    </span>
                </td>
                <td class="px-6 py-4">${item.loginCount}</td>
                <td class="px-6 py-4 text-xs text-gray-500">${item.lastLoginTime || '-'}</td>
                <td class="px-6 py-4 text-xs text-gray-500">${item.lastLoginIp || '-'}</td>
                <td class="px-6 py-4 text-xs text-gray-500">${item.currentLoginIp || '-'}</td>
                <td class="px-6 py-4 text-xs text-gray-500">${item.created}</td>
                <td class="px-6 py-4">
                    <button onclick="openEditClientModal(${item.id})" class="text-gray-400 hover:text-manta-primary transition-colors">
                        <i class="far fa-edit"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// Admin User Management
function openNewAdminModal() {
    document.getElementById('admin-modal-title').textContent = 'New Admin User';
    document.getElementById('admin-id').value = '';
    document.getElementById('admin-username').value = '';
    document.getElementById('admin-email').value = '';
    
    // Reset status to Active
    const statusRadios = document.getElementsByName('admin-status');
    statusRadios.forEach(r => r.checked = r.value === 'Active');
    
    document.getElementById('admin-password').value = '';
    document.getElementById('admin-confirm-password').value = '';
    
    clearAdminErrors();
    openModal('newAdminModal');
}

function openEditAdminModal(id) {
    const admin = mockData.systemAccounts.find(a => a.id === id);
    if (!admin) return;

    document.getElementById('admin-modal-title').textContent = 'Edit Admin User';
    document.getElementById('admin-id').value = admin.id;
    document.getElementById('admin-username').value = admin.adminUser;
    document.getElementById('admin-email').value = admin.email;
    
    const statusRadios = document.getElementsByName('admin-status');
    statusRadios.forEach(r => r.checked = r.value === admin.status);
    
    document.getElementById('admin-password').value = ''; 
    document.getElementById('admin-confirm-password').value = '';
    
    clearAdminErrors();
    openModal('newAdminModal');
}

function clearAdminErrors() {
    ['username', 'email', 'password', 'confirm-password'].forEach(field => {
        const el = document.getElementById(`admin-${field}-error`);
        if (el) el.classList.add('hidden');
    });
}

function submitAdminUser() {
    const id = document.getElementById('admin-id').value;
    const username = document.getElementById('admin-username').value.trim();
    const email = document.getElementById('admin-email').value.trim();
    const status = document.querySelector('input[name="admin-status"]:checked').value;
    const password = document.getElementById('admin-password').value;
    const confirmPassword = document.getElementById('admin-confirm-password').value;
    
    let hasError = false;
    clearAdminErrors();

    // Username validation
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        showError('admin-username-error', 'Username must contain only English characters, numbers and underscore');
        hasError = true;
    }
    if (!username) {
        showError('admin-username-error', 'Username is required');
        hasError = true;
    }

    // Email validation
    if (!email || !email.includes('@')) {
        showError('admin-email-error', 'Invalid email format');
        hasError = true;
    }

    // Password validation
    if (!id || password) {
        if (password !== confirmPassword) {
            showError('admin-confirm-password-error', 'Passwords do not match');
            hasError = true;
        }
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/.test(password)) {
             showError('admin-password-error', 'Password must be 8-20 characters, alphanumeric mix');
             hasError = true;
        }
    }

    if (hasError) return;

    if (id) {
        // Update existing
        const index = mockData.systemAccounts.findIndex(a => a.id == id);
        if (index !== -1) {
            mockData.systemAccounts[index] = {
                ...mockData.systemAccounts[index],
                adminUser: username,
                email: email,
                status: status
            };
        }
    } else {
        // Create new
        const newId = Math.max(...mockData.systemAccounts.map(a => a.id)) + 1;
        mockData.systemAccounts.unshift({
            id: newId,
            adminUser: username,
            email: email,
            status: status,
            loginCount: 0,
            lastLoginTime: "",
            lastLoginIp: "",
            currentLoginIp: "",
            created: new Date().toLocaleString('en-GB')
        });
    }

    renderSystemAccounts();
    closeModal('newAdminModal');
}

function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = message;
        el.classList.remove('hidden');
    }
}


// Data Access Logic (New)
const dataAccessState = {
    currentView: 'dashboard',
    dashboardFilter: 'ALL',
    detailsTab: 'Companies',
    detailsSearchQuery: '',
    selectedNodeId: null
};

function renderDataAccessDashboard() {
    const container = document.getElementById('view-data-access');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Header & Filter
    const actionBar = document.createElement('div');
    actionBar.className = 'flex flex-col gap-6 mb-8 p-8 pb-0';
    
    const filterBtnClass = (type) => 
        dataAccessState.dashboardFilter === type 
            ? 'px-4 py-2 rounded-lg text-sm font-medium bg-manta-primary text-white shadow-sm transition-all flex items-center gap-2' 
            : 'px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all flex items-center gap-2';

    actionBar.innerHTML = `
        <div class="flex justify-between items-center">
            <!-- Filter Group -->
            <div class="bg-white p-1 rounded-lg border border-gray-200 flex shadow-sm">
                <button onclick="setDataAccessFilter('ALL')" class="${filterBtnClass('ALL')}">
                    <i class="fas fa-th-large"></i>
                    <span>All</span>
                </button>
                <button onclick="setDataAccessFilter('CLOUD')" class="${filterBtnClass('CLOUD')}">
                    <i class="fas fa-cloud"></i>
                    <span>Cloud</span>
                </button>
                <button onclick="setDataAccessFilter('SCADA')" class="${filterBtnClass('SCADA')}">
                    <i class="fas fa-industry"></i>
                    <span>SCADA</span>
                </button>
                <button onclick="setDataAccessFilter('EDGE')" class="${filterBtnClass('EDGE')}">
                    <i class="fas fa-microchip"></i>
                    <span>Edge</span>
                </button>
            </div>
        </div>
    `;
    container.appendChild(actionBar);

    // Filter Nodes
    const filteredNodes = mockData.accessNodes.filter(node => 
        dataAccessState.dashboardFilter === 'ALL' || node.type === dataAccessState.dashboardFilter
    );

    // Grid Container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'flex-1 overflow-y-auto p-8 pt-0';

    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6';
    
    if (filteredNodes.length === 0) {
        grid.className = 'flex flex-col items-center justify-center py-20 text-gray-500 col-span-full';
        grid.innerHTML = `
            <i class="fas fa-inbox text-5xl mb-4 opacity-50"></i>
            <p>No access points found for this filter.</p>
        `;
    }
    
    filteredNodes.forEach(node => {
        const isOnline = node.status === 'online';
        const nodeTitle = `${node.vendor || 'Unknown'} ${node.type || ''}`.trim();
        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-manta-primary transition-colors group relative overflow-hidden cursor-pointer';
        card.onclick = () => renderDataAccessDetails(node.id);
        
        // Mock Last Sync Time (randomly within last 10 mins)
        const lastSyncTime = new Date(Date.now() - Math.floor(Math.random() * 600000)).toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '');

        card.innerHTML = `
            <div class="flex justify-between items-start mb-4 relative z-10 pointer-events-none">
                <div class="flex items-center gap-3">
                    <div class="flex-1 min-w-0">
                        <h3 class="font-semibold text-lg text-gray-900 leading-tight truncate" title="${nodeTitle}">${nodeTitle}</h3>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        <i class="fas fa-globe text-gray-400 text-[10px]"></i> ${node.country || 'Unknown'}
                    </span>
                    <span class="text-[10px] font-mono font-medium text-gray-600 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">${lastSyncTime}</span>
                </div>
            </div>

            <div class="flex flex-col gap-2 text-xs mt-auto relative z-10 pointer-events-none">
                <!-- Group 1: Device Status -->
                <div class="bg-gray-50 rounded-lg p-2 border border-gray-200 grid grid-cols-4 gap-2 group-hover:border-gray-300 transition-colors">
                    <!-- DERs Total -->
                    <div class="flex flex-col items-center justify-center gap-1 text-center">
                        <span class="text-gray-500 text-[10px] scale-90">DERs</span>
                        <span class="font-mono font-medium text-gray-900">${(node.inverters || 0) + (node.batteries || 0)}</span>
                    </div>
                    <!-- Online -->
                    <div class="flex flex-col items-center justify-center gap-1 text-center border-l border-gray-200">
                        <span class="text-gray-500 text-[10px] scale-90">Online</span>
                        <span class="font-mono font-medium text-green-600">${(node.invertersOnline || 0) + (node.batteriesOnline || 0)}</span>
                    </div>
                    <!-- Offline -->
                    <div class="flex flex-col items-center justify-center gap-1 text-center border-l border-gray-200">
                        <span class="text-gray-500 text-[10px] scale-90">Offline</span>
                        <span class="font-mono font-medium text-gray-400">${(node.invertersOffline || 0) + (node.batteriesOffline || 0)}</span>
                    </div>
                    <!-- Disconnected -->
                    <div class="flex flex-col items-center justify-center gap-1 text-center border-l border-gray-200">
                        <span class="text-gray-500 text-[10px] scale-90">Disconnected</span>
                        <span class="font-mono font-medium text-red-500">${(node.invertersDisconnected || 0) + (node.batteriesDisconnected || 0)}</span>
                    </div>
                </div>

                <!-- Group 2: Energy Stats -->
                <div class="bg-gray-50 rounded-lg p-2 border border-gray-200 grid grid-cols-3 gap-2 group-hover:border-gray-300 transition-colors">
                    <!-- Inv Power -->
                    <div class="flex flex-col items-center justify-center gap-1 text-center">
                        <span class="text-gray-500 text-[10px] scale-90">Rated Power</span>
                        <span class="font-mono font-medium text-gray-900">${((node.inverters || 0) * 5 + (node.batteries || 0) * 3)} kW</span>
                    </div>
                    <!-- PV Capacity -->
                    <div class="flex flex-col items-center justify-center gap-1 text-center border-l border-gray-200">
                        <span class="text-gray-500 text-[10px] scale-90">PV Capacity</span>
                        <span class="font-mono font-medium text-gray-900">${(node.inverters || 0) * 6.5} kW</span>
                    </div>
                    <!-- SOC -->
                    <div class="flex flex-col items-center justify-center gap-1 text-center border-l border-gray-200">
                        <span class="text-gray-500 text-[10px] scale-90">SOC</span>
                        <span class="font-mono font-medium text-gray-900 text-[10px]">${node.batteries > 0 ? '85%' : '-'}</span>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    gridContainer.appendChild(grid);
    container.appendChild(gridContainer);
}

function setDataAccessFilter(filter) {
    dataAccessState.dashboardFilter = filter;
    renderDataAccessDashboard();
}

function toggleNodeStatus(id) {
    const node = mockData.accessNodes.find(n => n.id === id);
    if (node) {
        node.status = node.status === 'online' ? 'offline' : 'online';
        renderDataAccessDashboard();
    }
}

function renderDataAccessDetails(nodeId) {
    const container = document.getElementById('view-data-access');
    const node = mockData.accessNodes.find(n => n.id == nodeId);
    if (!node || !container) return renderDataAccessDashboard();
    
    dataAccessState.selectedNodeId = nodeId;
    container.innerHTML = '';
    
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'flex-1 overflow-y-auto p-8';

    // Back button + Header
    const header = document.createElement('div');
    header.className = 'flex items-center gap-4 mb-8';
    header.innerHTML = `
        <button onclick="renderDataAccessDashboard()" class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900">
            <i class="fas fa-arrow-left text-xl"></i>
        </button>
        <div>
            <h1 class="text-2xl font-bold text-gray-900 tracking-tight">
                ${(node.vendor || 'Unknown') + ' ' + (node.type || '')}
            </h1>
        </div>
    `;
    scrollContainer.appendChild(header);

    // Content Grid
    const content = document.createElement('div');
    content.className = 'flex flex-col gap-8';

    // Top: Info & Config (Full Width)
    const infoPanel = document.createElement('div');
    infoPanel.className = 'bg-white border border-gray-200 shadow-sm p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-8';
    
    infoPanel.innerHTML = `
        <div>
            <div class="space-y-3">
                <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span class="text-gray-500 text-sm">Platform Type</span>
                    <span class="text-gray-900 font-mono text-sm uppercase">${node.type}</span>
                </div>
                <div class="flex justify-between items-center pt-1">
                    <span class="text-gray-500 text-sm">Manufacturer</span>
                    <span class="text-gray-900 font-mono text-sm">${node.vendor || 'Unknown'}</span>
                </div>
            </div>
        </div>
        <div>
            <div class="space-y-3">
                <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span class="text-gray-500 text-sm">Country</span>
                    <span class="text-gray-900 font-mono text-sm">${node.country || 'Unknown'}</span>
                </div>
                <div class="flex justify-between items-center pt-1">
                    <span class="text-gray-500 text-sm">Last Sync</span>
                    <span class="text-gray-900 font-mono text-sm">${new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>
        </div>
    `;

    // Bottom: Tabs & Table
    const mainPanel = document.createElement('div');
    mainPanel.className = 'space-y-6';

    const DEVICE_LIST = {
        'DERs': [
            ...generateDevices('Inverter', node.inverters || 2, node),
            ...generateDevices('Battery', node.batteries || 2, node)
        ]
    };
    
    const currentList = (DEVICE_LIST[dataAccessState.detailsTab] || []).filter(dev => {
        if (!dataAccessState.detailsSearchQuery) return true;
        const q = dataAccessState.detailsSearchQuery.toLowerCase();
        return (dev.sn && dev.sn.toLowerCase().includes(q)) ||
               (dev.nodeName && dev.nodeName.toLowerCase().includes(q));
    });

    const headers = [];
    
    mainPanel.innerHTML = `
        <div class="flex justify-between items-end border-b border-gray-200 pb-1">
            <div class="flex gap-4">
                <button onclick="setDetailsTab('Companies', ${nodeId})" class="px-4 py-2 transition-colors ${dataAccessState.detailsTab === 'Companies' ? 'text-manta-primary border-b-2 border-manta-primary font-medium' : 'text-gray-500 hover:text-gray-900'}">Companies</button>
                <button onclick="setDetailsTab('DERs', ${nodeId})" class="px-4 py-2 transition-colors ${dataAccessState.detailsTab === 'DERs' ? 'text-manta-primary border-b-2 border-manta-primary font-medium' : 'text-gray-500 hover:text-gray-900'}">DERs</button>
            </div>
            <div class="flex items-center gap-2 mb-2">
                <div class="relative">
                    <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        value="${dataAccessState.detailsSearchQuery || ''}"
                        oninput="setDetailsSearch(this.value, ${nodeId})"
                        class="bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-1.5 text-sm text-gray-900 focus:outline-none focus:border-manta-primary/50 w-64 transition-colors placeholder-gray-400"
                    >
                </div>
                ${dataAccessState.detailsTab === 'Companies' ? `
                <button onclick="openAddCompanyDrawer(${nodeId})" class="px-3 py-1.5 bg-manta-primary text-white text-sm rounded-lg hover:bg-manta-dark transition-colors shadow-sm flex items-center gap-2">
                     <i class="fas fa-plus"></i> Add
                </button>` : ''}
            </div>
        </div>
        
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">

             <div class="overflow-x-auto">
                ${dataAccessState.detailsTab === 'Companies' ? renderCompanyTable(node, dataAccessState.detailsSearchQuery) : renderDeviceTable(currentList, headers)}
             </div>
        </div>
    `;

    content.appendChild(infoPanel);
    content.appendChild(mainPanel);
    scrollContainer.appendChild(content);
    container.appendChild(scrollContainer);
}

function renderCompanyTable(node, searchQuery) {
    // Filter companies associated with this node (mocking association logic or showing all for demo if no specific link exists in mock)
    // For this demo, let's filter mockData.companies based on some criteria or just show all if node.company is set
    
    let companies = mockData.companies;
    
    // If the node has a specific company assigned (like in Cloud nodes), we might only show that one, 
    // or if it's a shared resource, maybe multiple. 
    // Given the request "Compay列表展示内容参考 div", I will replicate the structure.
    
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        companies = companies.filter(c => 
            c.companyName.toLowerCase().includes(q) || 
            c.industry.toLowerCase().includes(q) ||
            c.nation.toLowerCase().includes(q) ||
            c.abn.includes(q) ||
            c.address.toLowerCase().includes(q)
        );
    }

    return `
        <table class="w-full text-sm text-left text-gray-600">
            <thead class="bg-gray-100 text-gray-700 font-bold text-xs">
                <tr>
                    <th class="px-6 py-3 whitespace-nowrap">Company Name</th>
                    <th class="px-6 py-3 whitespace-nowrap">Industry</th>
                    <th class="px-6 py-3 whitespace-nowrap">Country</th>
                    <th class="px-6 py-3 whitespace-nowrap">Status</th>
                    <th class="px-6 py-3 whitespace-nowrap">ABN/VAT</th>
                    <th class="px-6 py-3 whitespace-nowrap">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                ${companies.map(company => `
                <tr class="hover:bg-gray-50 transition-colors border-b border-gray-50">
                    <td class="px-6 py-4 font-medium text-gray-900">${company.companyName}</td>
                    <td class="px-6 py-4">${company.industry}</td>
                    <td class="px-6 py-4">${company.nation}</td>
                    <td class="px-6 py-4">
                        <span class="px-2 py-1 text-xs font-semibold rounded-full ${company.status === 'Active' ? 'bg-green-100 text-green-800' : company.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}">
                            ${company.status}
                        </span>
                    </td>
                    <td class="px-6 py-4">${company.abn}</td>
                    <td class="px-6 py-4">
                        <button onclick="openDeleteCompanyModal('${company.companyName}')" class="text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                            <i class="far fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function renderDeviceTable(list, headers) {
    return `
        <table class="w-full text-left text-sm text-gray-600">
            <thead class="bg-gray-100 text-gray-700 font-bold text-xs">
                <tr>
                    <th class="px-6 py-3 whitespace-nowrap">Status</th>
                    <th class="px-6 py-3 whitespace-nowrap">SN</th>
                    <th class="px-6 py-3 whitespace-nowrap">Manufacturer</th>
                    <th class="px-6 py-3 whitespace-nowrap">Rated Power</th>
                    <th class="px-6 py-3 whitespace-nowrap">PV Capacity</th>
                    <th class="px-6 py-3 whitespace-nowrap">SOC</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
                ${list.map(dev => `
                <tr class="hover:bg-gray-50 transition-colors border-b border-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${dev.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}">
                            <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                            ${dev.status === 'online' ? 'online' : 'offline'}
                        </span>
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 font-mono">${dev.sn}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-gray-500">${dev.nodeName}</td>
                    <td class="px-6 py-4 whitespace-nowrap font-mono text-gray-500">${dev.ratedPower}</td>
                    <td class="px-6 py-4 whitespace-nowrap font-mono text-gray-500">${dev.pvCapacity}</td>
                    <td class="px-6 py-4 whitespace-nowrap font-mono text-gray-500">
                        ${dev.soc ? `
                        <div>
                            <div class="text-gray-900">${dev.soc.pct}%</div>
                            <div class="text-[10px] text-gray-500">${dev.soc.text}</div>
                        </div>
                        ` : '-'}
                    </td>
                </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function generateDevices(type, count, node) {
    // Generate mock devices for display
    const mocks = Array.from({length: count}, (_, i) => {
        const capacity = type === 'Inverter' ? 50 : 13.5; // kW
        const pvCapacity = type === 'Inverter' ? (capacity * 1.2) : 0;
        const soc = Math.floor(20 + Math.random() * 80);
        const totalEnergy = 14; // kWh for battery
        const currentEnergy = Math.round(totalEnergy * soc / 100);
        
        return {
            sn: `${type === 'Inverter' ? 'INV' : 'BAT'}-2024${String(i+1).padStart(3, '0')}`,
            nodeName: node.name || 'Industrial Park Zone 1',
            status: Math.random() > 0.1 ? 'online' : 'offline',
            ratedPower: `${capacity.toFixed(1)} kW`,
            pvCapacity: type === 'Inverter' ? `${pvCapacity.toFixed(1)} kW` : '-',
            soc: type === 'Battery' ? { pct: soc, text: `(${currentEnergy}/${totalEnergy} kWh)` } : null,
            todayYield: `${(Math.random() * 100 + 50).toFixed(1)} kWh`,
            model: type === 'Inverter' ? 'SG-5K-D' : 'LFP-10K',
            userName: `User ${i+1}`,
            data: {}
        };
    });
    return mocks;
}

function setDetailsTab(tab, nodeId) {
    dataAccessState.detailsTab = tab;
    renderDataAccessDetails(nodeId);
}

function setDetailsSearch(query, nodeId) {
    dataAccessState.detailsSearchQuery = query;
    renderDataAccessDetails(nodeId);
}

function toggleSecret(id, secret) {
    const el = document.getElementById(`secret-${id}`);
    if (el) {
        if (el.textContent.includes('•')) {
            el.textContent = secret;
        } else {
            el.textContent = '••••••••••••••••';
        }
    }
}


// Client User Management
function populateClientCompanies(selectedCompany) {
    const select = document.getElementById('client-company');
    if (!select) return;
    
    // Get unique company names from companies data
    const companies = [...new Set(mockData.companies.map(c => c.companyName))].sort();
    
    select.innerHTML = '<option value="">Select Company</option>';
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        if (selectedCompany && company === selectedCompany) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

function openNewClientModal() {
    document.getElementById('client-modal-title').textContent = 'New Client';
    document.getElementById('client-id').value = '';
    document.getElementById('client-username').value = '';
    document.getElementById('client-email').value = '';
    document.getElementById('client-mobile').value = '';
    
    // Reset status to Active
    const statusRadios = document.getElementsByName('client-status');
    statusRadios.forEach(r => r.checked = r.value === 'Active');
    
    document.getElementById('client-password').value = '';
    document.getElementById('client-confirm-password').value = '';
    
    populateClientCompanies();
    clearClientErrors();
    openModal('newClientModal');
}

function openEditClientModal(id) {
    const client = mockData.clients.find(c => c.id === id);
    if (!client) return;

    document.getElementById('client-modal-title').textContent = 'Edit Client';
    document.getElementById('client-id').value = client.id;
    document.getElementById('client-username').value = client.userName;
    document.getElementById('client-email').value = client.email;
    document.getElementById('client-mobile').value = client.mobile;
    
    const statusRadios = document.getElementsByName('client-status');
    statusRadios.forEach(r => r.checked = r.value === client.status);
    
    document.getElementById('client-password').value = '';
    document.getElementById('client-confirm-password').value = '';
    
    populateClientCompanies(client.company);
    clearClientErrors();
    openModal('newClientModal');
}

function clearClientErrors() {
    ['username', 'company', 'email', 'password', 'confirm-password'].forEach(field => {
        const el = document.getElementById(`client-${field}-error`);
        if (el) el.classList.add('hidden');
    });
}

function submitClientUser() {
    const id = document.getElementById('client-id').value;
    const username = document.getElementById('client-username').value.trim();
    const company = document.getElementById('client-company').value;
    const email = document.getElementById('client-email').value.trim();
    const mobile = document.getElementById('client-mobile').value.trim();
    const status = document.querySelector('input[name="client-status"]:checked').value;
    const password = document.getElementById('client-password').value;
    const confirmPassword = document.getElementById('client-confirm-password').value;
    
    let hasError = false;
    clearClientErrors();

    // Validations
    if (!username) {
        showError('client-username-error', 'User Name is required');
        hasError = true;
    }
    
    if (!company) {
        showError('client-company-error', 'Company is required');
        hasError = true;
    }

    if (!email || !email.includes('@')) {
        showError('client-email-error', 'Invalid email format');
        hasError = true;
    }

    if (!id || password) {
        if (password !== confirmPassword) {
            showError('client-confirm-password-error', 'Passwords do not match');
            hasError = true;
        }
        if (!/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/.test(password)) {
             showError('client-password-error', 'Password must be 8-20 characters, alphanumeric mix');
             hasError = true;
        }
    }

    if (hasError) return;

    if (id) {
        // Update existing
        const index = mockData.clients.findIndex(c => c.id == id);
        if (index !== -1) {
            mockData.clients[index] = {
                ...mockData.clients[index],
                userName: username,
                company: company,
                email: email,
                mobile: mobile,
                status: status
            };
        }
    } else {
        // Create new
        const newId = Math.max(...mockData.clients.map(c => c.id)) + 1;
        mockData.clients.unshift({
            id: newId,
            userName: username,
            email: email,
            company: company,
            mobile: mobile,
            status: status,
            loginCount: 0,
            lastLoginTime: "",
            lastLoginIp: "",
            currentLoginIp: "",
            created: new Date().toISOString().split('T')[0]
        });
    }

    renderClients();
    closeModal('newClientModal');
}

// Company Review Logic
function openReviewCompanyModal(id) {
    const company = mockData.companies.find(c => c.id === id);
    if (!company) return;

    // Find associated client/user
    // In a real app, this would be a DB relation. Here we match by company name.
    const client = mockData.clients.find(c => c.company === company.companyName);

    // Populate Company Info
    document.getElementById('review-company-id').value = company.id;
    document.getElementById('review-company-name').value = company.companyName;
    document.getElementById('review-industry').value = company.industry;
    document.getElementById('review-nation').value = company.nation;
    document.getElementById('review-abn').value = company.abn;
    document.getElementById('review-address').value = company.address;
    
    const statusRadios = document.getElementsByName('review-status');
    // Default to Active for review/approval flow usually, or keep current status
    // PRD implies we are reviewing to Approve, so default to Active makes sense?
    // Or should it show 'Pending'? The screenshot shows Active/Inactive options.
    // Let's default to Active as we are likely approving.
    statusRadios.forEach(r => r.checked = r.value === 'Active');

    // Populate User Info
    if (client) {
        // Mock data client name is "First Last", split it
        const nameParts = client.userName.split(' ');
        document.getElementById('review-firstname').value = nameParts[0] || '';
        document.getElementById('review-lastname').value = nameParts.slice(1).join(' ') || '';
        document.getElementById('review-mobile').value = client.mobile;
        document.getElementById('review-email').value = client.email;
    } else {
        document.getElementById('review-firstname').value = '';
        document.getElementById('review-lastname').value = '';
        document.getElementById('review-mobile').value = '';
        document.getElementById('review-email').value = '';
    }

    openModal('reviewCompanyModal');
}

function approveCompany() {
    const id = document.getElementById('review-company-id').value;
    const companyName = document.getElementById('review-company-name').value;
    const industry = document.getElementById('review-industry').value;
    const nation = document.getElementById('review-nation').value;
    const abn = document.getElementById('review-abn').value;
    const address = document.getElementById('review-address').value;
    const status = document.querySelector('input[name="review-status"]:checked').value;
    
    const firstName = document.getElementById('review-firstname').value;
    const lastName = document.getElementById('review-lastname').value;
    const mobile = document.getElementById('review-mobile').value;
    const email = document.getElementById('review-email').value;

    // Update Company
    const compIndex = mockData.companies.findIndex(c => c.id == id);
    if (compIndex !== -1) {
        // Store old name to update client if changed
        const oldCompanyName = mockData.companies[compIndex].companyName;
        
        mockData.companies[compIndex] = {
            ...mockData.companies[compIndex],
            companyName: companyName,
            industry: industry,
            nation: nation,
            abn: abn,
            address: address,
            status: status
        };

        // Update Associated Client
        const clientIndex = mockData.clients.findIndex(c => c.company === oldCompanyName);
        if (clientIndex !== -1) {
            mockData.clients[clientIndex] = {
                ...mockData.clients[clientIndex],
                userName: `${firstName} ${lastName}`.trim(),
                company: companyName, // Update company name link
                mobile: mobile,
                email: email,
                status: status // Sync status
            };
        }
    }

    // Refresh view
    renderCompanies();
    closeModal('reviewCompanyModal');
}

let currentCompanyTab = 'approved';
let currentPage = 1;
let pageSize = 5;

function switchCompanyTab(tab) {
    currentCompanyTab = tab;
    currentPage = 1; // Reset to first page
    renderCompanies();
    updateTabUI();
}

function updateTabUI() {
    const approvedTab = document.getElementById('tab-approved');
    const awaitingTab = document.getElementById('tab-awaiting');
    
    // Active class string (with borders and white bg)
    const activeClasses = "text-gray-700 bg-gray-100 border-t border-l border-r border-gray-200 rounded-t-lg relative top-[1px] z-10".split(" ");
    // Inactive class string (transparent bg, hover effect)
    const inactiveClasses = "text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-t-lg relative".split(" ");

    // Reset both to base state (remove all unique classes)
    approvedTab.className = "px-6 py-3 text-sm font-medium transition-colors duration-200";
    awaitingTab.className = "px-6 py-3 text-sm font-medium transition-colors duration-200";

    if (currentCompanyTab === 'approved') {
        approvedTab.classList.add(...activeClasses);
        awaitingTab.classList.add(...inactiveClasses);
    } else {
        awaitingTab.classList.add(...activeClasses);
        approvedTab.classList.add(...inactiveClasses);
    }
}

function changePage(delta) {
    currentPage += delta;
    renderCompanies();
}

function changePageSize(size) {
    pageSize = parseInt(size);
    currentPage = 1;
    renderCompanies();
}

function renderCompanies() {
    const tbody = document.getElementById('companies-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    // Filter data based on tab
    let filteredData = mockData.companies.filter(item => {
        if (currentCompanyTab === 'approved') {
            return item.status === 'Active' || item.status === 'Inactive';
        } else {
            return item.status === 'Pending';
        }
    });

    // Pagination logic
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    
    // Ensure currentPage is valid
    if (currentPage < 1) currentPage = 1;
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = filteredData.slice(startIndex, endIndex);

    // Update Pagination UI
    const totalCountEl = document.getElementById('total-count');
    const currentPageEl = document.getElementById('current-page');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    if (totalCountEl) totalCountEl.textContent = totalItems;
    if (currentPageEl) currentPageEl.textContent = currentPage;
    
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;

    if (pageData.length === 0) {
        // Render empty rows if no data
         for(let i=0; i<pageSize; i++) {
             const tr = document.createElement('tr');
             tr.className = 'hover:bg-gray-50 transition-colors h-12';
             tr.innerHTML = `<td colspan="9" class="px-6 py-4 border-b border-gray-100"></td>`;
             tbody.appendChild(tr);
        }
    } else {
        pageData.forEach((item) => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50 transition-colors border-b border-gray-50';
            tr.innerHTML = `
                <td class="px-6 py-4 font-medium text-gray-900">${item.companyName}</td>
                <td class="px-6 py-4">${item.industry}</td>
                <td class="px-6 py-4">${item.nation}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full ${
                        item.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        item.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                        'bg-yellow-100 text-yellow-800'
                    }">
                        ${item.status}
                    </span>
                </td>
                <td class="px-6 py-4">${item.abn}</td>
                <td class="px-6 py-4">
                    <button onclick="${currentCompanyTab === 'awaiting' ? `openReviewCompanyModal(${item.id})` : `openEditCompanyModal(${item.id})`}" class="text-gray-400 hover:text-manta-primary">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
    // Update Badge
    updateAwaitingBadge();
}

function updateAwaitingBadge() {
    const pendingCount = mockData.companies.filter(c => c.status === 'Pending').length;
    const badge = document.getElementById('awaiting-badge');
    if (badge) {
        badge.textContent = pendingCount;
        if (pendingCount > 0) {
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

function openEditCompanyModal(id) {
    const company = mockData.companies.find(c => c.id === id);
    if (!company) return;

    document.getElementById('edit-company-id').value = company.id;
    document.getElementById('edit-company-name').value = company.companyName;
    document.getElementById('edit-industry').value = company.industry;
    document.getElementById('edit-nation').value = company.nation;
    document.getElementById('edit-abn').value = company.abn;
    document.getElementById('edit-address').value = company.businessAddress;
    
    // Set status radio
    const statusRadios = document.getElementsByName('edit-status');
    for (const radio of statusRadios) {
        if (radio.value === company.status) {
            radio.checked = true;
        }
    }

    openModal('editCompanyModal');
}

function submitEditCompany() {
    const id = document.getElementById('edit-company-id').value;
    const companyIndex = mockData.companies.findIndex(c => c.id == id);
    
    if (companyIndex !== -1) {
        const name = document.getElementById('edit-company-name').value;
        const industry = document.getElementById('edit-industry').value;
        const nation = document.getElementById('edit-nation').value;
        const abn = document.getElementById('edit-abn').value;
        const address = document.getElementById('edit-address').value;
        
        // Get status
        let status = 'Active';
        const statusRadios = document.getElementsByName('edit-status');
        for (const radio of statusRadios) {
            if (radio.checked) {
                status = radio.value;
                break;
            }
        }

        mockData.companies[companyIndex] = {
            ...mockData.companies[companyIndex],
            companyName: name,
            industry: industry,
            nation: nation,
            abn: abn,
            businessAddress: address,
            status: status
        };
        
        renderCompanies();
        closeModal('editCompanyModal');
    }
}

// Modal Logic
function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Close modal on click outside
window.onclick = function(event) {
    if (event.target.classList.contains('bg-black')) {
        event.target.classList.add('hidden');
    }

    // Close user menu if clicking outside
    const userMenu = document.getElementById('userMenu');
    const userButton = document.querySelector('button[onclick="toggleUserMenu()"]');
    // Check if elements exist to avoid errors
    if (userMenu && userButton) {
        if (!userMenu.classList.contains('hidden') && !userButton.contains(event.target) && !userMenu.contains(event.target)) {
            userMenu.classList.add('hidden');
        }
    }
}

// User Menu Logic
function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    menu.classList.toggle('hidden');
}

function handleLogout() {
    // In a real app, clear tokens/session here
    window.location.href = 'index.html';
}



// Company Deletion Logic
let companyToDelete = null;

function openDeleteCompanyModal(companyName) {
    companyToDelete = companyName;
    openModal('deleteCompanyModal');
}

function confirmDeleteCompany() {
    if (companyToDelete) {
        // Remove company from mock data
        const index = mockData.companies.findIndex(c => c.companyName === companyToDelete);
        if (index > -1) {
            mockData.companies.splice(index, 1);
            
            // Re-render Data Access Details if open
            if (dataAccessState.selectedNodeId) {
                renderDataAccessDetails(dataAccessState.selectedNodeId);
            }
            
            // Also re-render global company list if needed (though it's a separate view)
            renderCompanies(); 
        }
    }
    closeModal('deleteCompanyModal');
    companyToDelete = null;
}

// --- Add Company Logic (Drawer) ---

const mockCandidateCompanies = [
    { id: 201, companyName: "Aussie Solar Tech", industry: "Technology", nation: "Australia", status: "Active", abn: "111222333", address: "Sydney" },
    { id: 202, companyName: "Melb Power", industry: "Energy Retailer", nation: "Australia", status: "Active", abn: "444555666", address: "Melbourne" },
    { id: 203, companyName: "Perth Grid", industry: "Commercial", nation: "Australia", status: "Active", abn: "777888999", address: "Perth" },
    { id: 204, companyName: "US Grid Sol", industry: "Commercial", nation: "USA", status: "Active", abn: "999888777", address: "New York" },
    { id: 205, companyName: "Texas Energy", industry: "Energy Retailer", nation: "USA", status: "Active", abn: "123456789", address: "Houston" },
    { id: 206, companyName: "Berlin Solar", industry: "Technology", nation: "Germany", status: "Active", abn: "DE123456", address: "Berlin" },
    { id: 207, companyName: "Munich Power", industry: "Commercial", nation: "Germany", status: "Active", abn: "DE654321", address: "Munich" },
    { id: 208, companyName: "Tokyo Grid", industry: "Energy Retailer", nation: "Japan", status: "Active", abn: "JP12345", address: "Tokyo" }
];

let selectedCandidates = new Set();
let currentDrawerNodeId = null;
let currentCandidates = []; // Store current filtered candidates for the drawer

function openAddCompanyDrawer(nodeId) {
    currentDrawerNodeId = nodeId;
    selectedCandidates.clear();
    
    // Reset search input
    const searchInput = document.getElementById('addCompanySearch');
    if (searchInput) searchInput.value = '';
    
    const node = mockData.accessNodes.find(n => n.id === nodeId);
    if (!node) return;
    
    const country = node.country || '';
    
    // Filter candidates by country AND not already in the list
    const existingNames = new Set(mockData.companies.map(c => c.companyName));
    
    // Store all valid candidates for this node
    currentCandidates = mockCandidateCompanies.filter(c => 
        c.nation === country && !existingNames.has(c.companyName)
    );
    
    renderCandidateList(currentCandidates);
    
    const drawer = document.getElementById('addCompanyDrawer');
    const content = document.getElementById('addCompanyDrawerContent');
    
    if (drawer && content) {
        drawer.classList.remove('hidden');
        // Small timeout for animation
        setTimeout(() => {
            content.classList.remove('translate-x-full');
        }, 10);
    }
}

function filterCompanyCandidates(query) {
    if (!query) {
        renderCandidateList(currentCandidates);
        return;
    }
    const lowerQ = query.toLowerCase();
    const filtered = currentCandidates.filter(c => 
        c.companyName.toLowerCase().includes(lowerQ) || 
        c.industry.toLowerCase().includes(lowerQ)
    );
    renderCandidateList(filtered);
}

function renderCandidateList(list) {
    const container = document.getElementById('addCompanyList');
    if (!container) return;
    
    if (list.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-500 mt-10 flex flex-col items-center">
                <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                    <i class="far fa-folder-open text-2xl text-gray-400"></i>
                </div>
                <p class="text-sm">No companies found.</p>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="space-y-3">
                ${list.map(c => {
                    const isSelected = selectedCandidates.has(c.id);
                    return `
                    <label id="candidate-card-${c.id}" class="flex items-start p-3 border ${isSelected ? 'border-manta-primary bg-blue-50/50' : 'border-gray-200 hover:border-blue-300'} rounded-lg cursor-pointer transition-all duration-200 group">
                        <div class="pt-0.5">
                            <input type="checkbox" onchange="toggleCandidateSelection(${c.id}, this.checked)" ${isSelected ? 'checked' : ''} class="w-4 h-4 text-manta-primary rounded border-gray-300 focus:ring-manta-primary">
                        </div>
                        <div class="ml-3 flex-1">
                            <div class="flex justify-between items-start">
                                <p class="text-sm font-bold text-gray-900 group-hover:text-manta-primary transition-colors">${c.companyName}</p>
                                <span class="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded uppercase tracking-wide">${c.industry}</span>
                            </div>
                            <div class="mt-1 flex items-center gap-2 text-xs text-gray-500">
                                <span><i class="fas fa-map-marker-alt text-gray-300 mr-1"></i>${c.address}</span>
                            </div>
                        </div>
                    </label>
                `}).join('')}
            </div>
        `;
    }
}

function closeDrawer(drawerId) {
    const drawer = document.getElementById(drawerId);
    const content = document.getElementById(drawerId + 'Content');
    
    if (content) {
        content.classList.add('translate-x-full');
    }
    
    // Wait for animation to finish before hiding
    setTimeout(() => {
        if (drawer) drawer.classList.add('hidden');
    }, 300);
}

function toggleCandidateSelection(id, isChecked) {
    if (isChecked) {
        selectedCandidates.add(id);
    } else {
        selectedCandidates.delete(id);
    }
    // Update visual state of the card
    const card = document.getElementById(`candidate-card-${id}`);
    if (card) {
        if (isChecked) {
            card.classList.remove('border-gray-200', 'hover:border-blue-300');
            card.classList.add('border-manta-primary', 'bg-blue-50/50');
        } else {
            card.classList.remove('border-manta-primary', 'bg-blue-50/50');
            card.classList.add('border-gray-200', 'hover:border-blue-300');
        }
    }
}

function submitAddCompany() {
    if (selectedCandidates.size > 0) {
        // Find selected company objects
        const toAdd = mockCandidateCompanies.filter(c => selectedCandidates.has(c.id));
        
        // Add to mockData.companies
        toAdd.forEach(c => {
            mockData.companies.push({...c});
        });
        
        // Refresh view
        if (currentDrawerNodeId) {
            renderDataAccessDetails(currentDrawerNodeId);
        }
    }
    closeDrawer('addCompanyDrawer');
}
