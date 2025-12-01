window.loadAppContent = function (appName, container) {
    switch (appName) {
        case 'calculator':
            renderCalculator(container);
            break;
        case 'notes':
            renderNotes(container);
            break;
        case 'finder':
            renderFinder(container);
            break;
        case 'settings':
            renderSettings(container);
            break;
        default:
            container.innerHTML = `<div style="padding: 20px; text-align: center; color: #666;">${appName} is not yet implemented.</div>`;
    }
};

function renderCalculator(container) {
    container.innerHTML = `
        <div class="calculator-app">
            <div class="calc-display">0</div>
            <div class="calc-buttons">
                <button class="calc-btn light-grey" onclick="calcAction('c')">AC</button>
                <button class="calc-btn light-grey" onclick="calcAction('neg')">+/-</button>
                <button class="calc-btn light-grey" onclick="calcAction('%')">%</button>
                <button class="calc-btn orange" onclick="calcAction('/')">÷</button>
                <button class="calc-btn" onclick="calcAction('7')">7</button>
                <button class="calc-btn" onclick="calcAction('8')">8</button>
                <button class="calc-btn" onclick="calcAction('9')">9</button>
                <button class="calc-btn orange" onclick="calcAction('*')">×</button>
                <button class="calc-btn" onclick="calcAction('4')">4</button>
                <button class="calc-btn" onclick="calcAction('5')">5</button>
                <button class="calc-btn" onclick="calcAction('6')">6</button>
                <button class="calc-btn orange" onclick="calcAction('-')">-</button>
                <button class="calc-btn" onclick="calcAction('1')">1</button>
                <button class="calc-btn" onclick="calcAction('2')">2</button>
                <button class="calc-btn" onclick="calcAction('3')">3</button>
                <button class="calc-btn orange" onclick="calcAction('+')">+</button>
                <button class="calc-btn zero" onclick="calcAction('0')">0</button>
                <button class="calc-btn" onclick="calcAction('.')">.</button>
                <button class="calc-btn orange" onclick="calcAction('=')">=</button>
            </div>
        </div>
    `;

    // Calculator Logic
    let currentInput = '0';
    let previousInput = null;
    let operator = null;
    let shouldResetScreen = false;

    window.calcAction = function (val) {
        const display = container.querySelector('.calc-display');

        if (!isNaN(val) || val === '.') {
            if (currentInput === '0' || shouldResetScreen) {
                currentInput = val;
                shouldResetScreen = false;
            } else {
                currentInput += val;
            }
        } else if (val === 'c') {
            currentInput = '0';
            previousInput = null;
            operator = null;
        } else if (val === '=') {
            if (operator && previousInput !== null) {
                currentInput = String(eval(`${previousInput} ${operator} ${currentInput}`));
                operator = null;
                previousInput = null;
                shouldResetScreen = true;
            }
        } else {
            operator = val;
            previousInput = currentInput;
            shouldResetScreen = true;
        }
        display.textContent = currentInput;
    };
}

function renderNotes(container) {
    const savedNote = localStorage.getItem('macOS_note') || '';
    container.innerHTML = `
        <div class="notes-app">
            <div class="notes-sidebar" style="display: flex; flex-direction: column;">
                <div style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; color: #999; font-size: 12px;">TODAY</div>
                <textarea class="notes-textarea" placeholder="Type your notes here...">${savedNote}</textarea>
            </div>
        </div>
    `;

    const textarea = container.querySelector('.notes-textarea');
    textarea.addEventListener('input', (e) => {
        localStorage.setItem('macOS_note', e.target.value);
    });
}

function renderFinder(container) {
    container.innerHTML = `
        <div style="display: flex; height: 100%; background: #fff;">
            <div style="width: 150px; background: #f0f0f0; padding: 10px; border-right: 1px solid #ddd;">
                <div style="color: #666; font-size: 11px; font-weight: bold; margin-bottom: 5px;">Favorites</div>
                <div style="padding: 5px; cursor: pointer; border-radius: 4px; background: #ddd;">AirDrop</div>
                <div style="padding: 5px; cursor: pointer;">Recents</div>
                <div style="padding: 5px; cursor: pointer;">Applications</div>
                <div style="padding: 5px; cursor: pointer;">Desktop</div>
                <div style="padding: 5px; cursor: pointer;">Documents</div>
                <div style="padding: 5px; cursor: pointer;">Downloads</div>
            </div>
            <div style="flex: 1; padding: 20px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 20px;">
                    <div style="text-align: center;">
                        <div style="font-size: 40px; color: #007aff;"><i class="fas fa-folder"></i></div>
                        <div style="font-size: 12px; margin-top: 5px;">Work</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 40px; color: #007aff;"><i class="fas fa-folder"></i></div>
                        <div style="font-size: 12px; margin-top: 5px;">Personal</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 40px; color: #999;"><i class="fas fa-file-alt"></i></div>
                        <div style="font-size: 12px; margin-top: 5px;">Resume.pdf</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 40px; color: #999;"><i class="fas fa-image"></i></div>
                        <div style="font-size: 12px; margin-top: 5px;">Photo.jpg</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderSettings(container) {
    container.innerHTML = `
        <div style="padding: 20px; background: #f5f5f5; height: 100%;">
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                <div style="width: 60px; height: 60px; background: #ccc; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 30px; color: white;">
                    <i class="fas fa-user"></i>
                </div>
                <div>
                    <div style="font-weight: bold; font-size: 18px;">User</div>
                    <div style="color: #666; font-size: 13px;">Apple ID, iCloud, Media & Purchases</div>
                </div>
            </div>
            <div style="background: white; border-radius: 10px; overflow: hidden; border: 1px solid #ddd;">
                <div style="padding: 10px 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                    <span>Wi-Fi</span>
                    <span style="color: #666;">Not Connected <i class="fas fa-chevron-right" style="font-size: 12px; margin-left: 5px;"></i></span>
                </div>
                <div style="padding: 10px 15px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                    <span>Bluetooth</span>
                    <span style="color: #666;">On <i class="fas fa-chevron-right" style="font-size: 12px; margin-left: 5px;"></i></span>
                </div>
                <div style="padding: 10px 15px; display: flex; justify-content: space-between; align-items: center;">
                    <span>Network</span>
                    <span style="color: #666;"><i class="fas fa-chevron-right" style="font-size: 12px; margin-left: 5px;"></i></span>
                </div>
            </div>
        </div>
    `;
}
