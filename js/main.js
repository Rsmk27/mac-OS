document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('boot-screen');
    const loginScreen = document.getElementById('login-screen');
    const desktop = document.getElementById('desktop');
    const progressBar = document.querySelector('.progress-bar');
    const loginBtn = document.getElementById('login-btn');
    const loginPassword = document.getElementById('login-password');
    const clockElement = document.getElementById('clock');
    const desktopArea = document.getElementById('desktop-area');
    const dockItems = document.querySelectorAll('.dock-item');

    // Boot Sequence
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 500);

    setTimeout(() => {
        bootScreen.classList.add('hidden');
        loginScreen.classList.remove('hidden');
    }, 3500);

    // Login Logic
    function login() {
        loginScreen.style.opacity = '0';
        setTimeout(() => {
            loginScreen.classList.add('hidden');
            desktop.classList.remove('hidden');
        }, 500);
    }

    loginBtn.addEventListener('click', login);
    loginPassword.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') login();
    });

    // Clock
    function updateClock() {
        const now = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        clockElement.textContent = now.toLocaleString('en-US', options).replace(',', '');
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Window Management
    let zIndexCounter = 100;
    const activeWindows = {};

    window.openApp = function(appName) {
        if (activeWindows[appName]) {
            // Bring to front if already open
            const win = activeWindows[appName];
            win.style.display = 'flex';
            win.style.zIndex = ++zIndexCounter;
            
            // Restore if minimized (animation logic could be added here)
            return;
        }

        const win = document.createElement('div');
        win.classList.add('window');
        win.style.zIndex = ++zIndexCounter;
        win.style.left = '100px';
        win.style.top = '50px';
        
        // Basic Window Structure
        win.innerHTML = `
            <div class="window-header">
                <div class="traffic-lights">
                    <div class="traffic-light close-btn"></div>
                    <div class="traffic-light minimize-btn"></div>
                    <div class="traffic-light maximize-btn"></div>
                </div>
                <div class="window-title">${appName.charAt(0).toUpperCase() + appName.slice(1)}</div>
            </div>
            <div class="window-content" id="${appName}-content"></div>
        `;

        desktopArea.appendChild(win);
        activeWindows[appName] = win;

        // Load App Content
        if (window.loadAppContent) {
            window.loadAppContent(appName, win.querySelector('.window-content'));
        }

        // Window Controls
        const closeBtn = win.querySelector('.close-btn');
        const minimizeBtn = win.querySelector('.minimize-btn');
        const header = win.querySelector('.window-header');

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            win.remove();
            delete activeWindows[appName];
            // Remove active dot from dock
            document.querySelector(`.dock-item[data-app="${appName}"]`)?.classList.remove('active');
        });

        minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            win.style.display = 'none';
        });

        win.addEventListener('mousedown', () => {
            win.style.zIndex = ++zIndexCounter;
        });

        // Draggable Logic
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialLeft = win.offsetLeft;
            initialTop = win.offsetTop;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            win.style.left = `${initialLeft + dx}px`;
            win.style.top = `${initialTop + dy}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Set active dot in dock
        document.querySelector(`.dock-item[data-app="${appName}"]`)?.classList.add('active');
    };

    // Dock Interactions
    dockItems.forEach(item => {
        item.addEventListener('click', () => {
            const appName = item.getAttribute('data-app');
            if (appName) {
                window.openApp(appName);
                
                // Bounce animation
                item.style.animation = 'bounce 0.5s';
                setTimeout(() => item.style.animation = '', 500);
            }
        });
    });

    // Desktop Icons
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.addEventListener('click', () => {
            document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
            icon.classList.add('selected');
        });

        icon.addEventListener('dblclick', () => {
            const appName = icon.getAttribute('data-app');
            if (appName) window.openApp(appName);
        });
    });

    // Deselect on desktop click
    desktopArea.addEventListener('click', (e) => {
        if (e.target === desktopArea) {
            document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
        }
    });
});

// CSS for bounce animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}
`;
document.head.appendChild(style);
