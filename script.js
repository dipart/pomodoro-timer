class PomodoroTimer {
    constructor() {
        // 时间设置 (分钟)
        this.durations = {
            work: 25,
            'short-break': 5,
            'long-break': 15
        };
        
        // 当前状态
        this.currentMode = 'work';
        this.isRunning = false;
        this.isPaused = false;
        this.timeLeft = this.durations.work * 60; // 转换为秒
        this.completedPomodoros = 0;
        this.totalFocusTime = 0;
        
        // 定时器
        this.timer = null;
        
        // DOM 元素
        this.initElements();
        
        // 事件监听
        this.initEventListeners();
        
        // 初始化显示
        this.updateDisplay();
        this.updateProgressRing();
        
        // 加载保存的数据
        this.loadStats();
    }
    
    initElements() {
        // 显示元素
        this.timeDisplay = document.getElementById('time-display');
        this.modeText = document.getElementById('mode-text');
        this.progressRing = document.querySelector('.progress-ring-circle');
        
        // 控制按钮
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        
        // 模式按钮
        this.modeBtns = document.querySelectorAll('.mode-btn');
        
        // 设置输入
        this.workDurationInput = document.getElementById('work-duration');
        this.shortBreakInput = document.getElementById('short-break-duration');
        this.longBreakInput = document.getElementById('long-break-duration');
        this.soundEnabledInput = document.getElementById('sound-enabled');
        
        // 统计显示
        this.completedPomodorosDisplay = document.getElementById('completed-pomodoros');
        this.focusTimeDisplay = document.getElementById('focus-time');
        
        // 计算进度环周长
        this.circumference = 2 * Math.PI * 120; // r=120
        this.progressRing.style.strokeDasharray = this.circumference;
    }
    
    initEventListeners() {
        // 控制按钮事件
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        // 模式切换事件
        this.modeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (!this.isRunning) {
                    this.switchMode(btn.dataset.mode);
                }
            });
        });
        
        // 设置变更事件
        this.workDurationInput.addEventListener('change', () => {
            this.durations.work = parseInt(this.workDurationInput.value);
            if (this.currentMode === 'work' && !this.isRunning) {
                this.timeLeft = this.durations.work * 60;
                this.updateDisplay();
                this.updateProgressRing();
            }
        });
        
        this.shortBreakInput.addEventListener('change', () => {
            this.durations['short-break'] = parseInt(this.shortBreakInput.value);
            if (this.currentMode === 'short-break' && !this.isRunning) {
                this.timeLeft = this.durations['short-break'] * 60;
                this.updateDisplay();
                this.updateProgressRing();
            }
        });
        
        this.longBreakInput.addEventListener('change', () => {
            this.durations['long-break'] = parseInt(this.longBreakInput.value);
            if (this.currentMode === 'long-break' && !this.isRunning) {
                this.timeLeft = this.durations['long-break'] * 60;
                this.updateDisplay();
                this.updateProgressRing();
            }
        });
        
        // 页面可见性变化事件（用于标题提醒）
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isRunning) {
                this.updateTitle();
            } else if (!document.hidden) {
                document.title = '番茄时钟 - Pomodoro Timer';
            }
        });
    }
    
    start() {
        this.isRunning = true;
        this.isPaused = false;
        
        // 切换按钮显示
        this.startBtn.style.display = 'none';
        this.pauseBtn.style.display = 'flex';
        
        // 禁用模式切换
        this.modeBtns.forEach(btn => btn.disabled = true);
        
        // 启动定时器
        this.timer = setInterval(() => {
            this.tick();
        }, 1000);
        
        this.updateTitle();
    }
    
    pause() {
        this.isRunning = false;
        this.isPaused = true;
        
        // 切换按钮显示
        this.startBtn.style.display = 'flex';
        this.pauseBtn.style.display = 'none';
        
        // 启用模式切换
        this.modeBtns.forEach(btn => btn.disabled = false);
        
        // 清除定时器
        clearInterval(this.timer);
        
        document.title = '番茄时钟 - Pomodoro Timer';
    }
    
    reset() {
        this.isRunning = false;
        this.isPaused = false;
        
        // 重置时间
        this.timeLeft = this.durations[this.currentMode] * 60;
        
        // 切换按钮显示
        this.startBtn.style.display = 'flex';
        this.pauseBtn.style.display = 'none';
        
        // 启用模式切换
        this.modeBtns.forEach(btn => btn.disabled = false);
        
        // 清除定时器
        clearInterval(this.timer);
        
        // 更新显示
        this.updateDisplay();
        this.updateProgressRing();
        
        document.title = '番茄时钟 - Pomodoro Timer';
    }
    
    tick() {
        this.timeLeft--;
        
        if (this.timeLeft < 0) {
            this.complete();
            return;
        }
        
        this.updateDisplay();
        this.updateProgressRing();
        this.updateTitle();
    }
    
    complete() {
        this.isRunning = false;
        
        // 播放提醒音
        if (this.soundEnabledInput.checked) {
            this.playNotificationSound();
        }
        
        // 显示完成动画
        document.querySelector('.timer-card').classList.add('completed');
        setTimeout(() => {
            document.querySelector('.timer-card').classList.remove('completed');
        }, 600);
        
        // 更新统计
        if (this.currentMode === 'work') {
            this.completedPomodoros++;
            this.totalFocusTime += this.durations.work;
            this.saveStats();
            
            // 自动切换到休息模式
            const nextMode = (this.completedPomodoros % 4 === 0) ? 'long-break' : 'short-break';
            this.switchMode(nextMode);
        } else {
            // 休息完成，切换到工作模式
            this.switchMode('work');
        }
        
        // 重置按钮状态
        this.startBtn.style.display = 'flex';
        this.pauseBtn.style.display = 'none';
        this.modeBtns.forEach(btn => btn.disabled = false);
        
        // 清除定时器
        clearInterval(this.timer);
        
        // 显示通知
        this.showNotification();
        
        document.title = '番茄时钟 - Pomodoro Timer';
    }
    
    switchMode(mode) {
        this.currentMode = mode;
        this.timeLeft = this.durations[mode] * 60;
        
        // 更新模式按钮状态
        this.modeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
        
        // 更新进度环颜色
        this.progressRing.className = `progress-ring-circle ${mode}`;
        
        // 更新显示
        this.updateDisplay();
        this.updateProgressRing();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const modeTexts = {
            'work': '工作时间',
            'short-break': '短休息',
            'long-break': '长休息'
        };
        
        this.modeText.textContent = modeTexts[this.currentMode];
        
        // 更新统计显示
        this.completedPomodorosDisplay.textContent = this.completedPomodoros;
        this.focusTimeDisplay.textContent = `${this.totalFocusTime} 分钟`;
    }
    
    updateProgressRing() {
        const totalTime = this.durations[this.currentMode] * 60;
        const progress = (totalTime - this.timeLeft) / totalTime;
        const offset = this.circumference * (1 - progress);
        
        this.progressRing.style.strokeDashoffset = offset;
    }
    
    updateTitle() {
        if (this.isRunning) {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            const modeTexts = {
                'work': '工作中',
                'short-break': '短休息',
                'long-break': '长休息'
            };
            
            document.title = `${timeStr} - ${modeTexts[this.currentMode]} | 番茄时钟`;
        }
    }
    
    playNotificationSound() {
        // 创建音频上下文和振荡器来生成提醒音
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log('无法播放音效:', error);
        }
    }
    
    showNotification() {
        // 检查浏览器通知权限
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                this.createNotification();
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        this.createNotification();
                    }
                });
            }
        }
    }
    
    createNotification() {
        const messages = {
            'work': '工作时间结束！该休息一下了 🎉',
            'short-break': '短休息结束！继续专注工作 💪',
            'long-break': '长休息结束！准备开始新的番茄钟 🍅'
        };
        
        const notification = new Notification('番茄时钟提醒', {
            body: messages[this.currentMode],
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">🍅</text></svg>',
            badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="0.9em" font-size="90">🍅</text></svg>'
        });
        
        // 3秒后自动关闭通知
        setTimeout(() => {
            notification.close();
        }, 3000);
        
        // 点击通知时聚焦窗口
        notification.onclick = () => {
            window.focus();
            notification.close();
        };
    }
    
    saveStats() {
        const stats = {
            completedPomodoros: this.completedPomodoros,
            totalFocusTime: this.totalFocusTime,
            date: new Date().toDateString()
        };
        
        localStorage.setItem('pomodoroStats', JSON.stringify(stats));
    }
    
    loadStats() {
        const savedStats = localStorage.getItem('pomodoroStats');
        
        if (savedStats) {
            const stats = JSON.parse(savedStats);
            const today = new Date().toDateString();
            
            // 如果是今天的数据，加载统计
            if (stats.date === today) {
                this.completedPomodoros = stats.completedPomodoros || 0;
                this.totalFocusTime = stats.totalFocusTime || 0;
            } else {
                // 新的一天，重置统计
                this.completedPomodoros = 0;
                this.totalFocusTime = 0;
                this.saveStats();
            }
        }
        
        // 更新显示
        this.updateDisplay();
    }
}

// 页面加载完成后初始化番茄时钟
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});

// 注册 Service Worker 以支持离线使用（可选）
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}