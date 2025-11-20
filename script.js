// Основной класс для торта

class BirthdayCake {
    constructor() {
        this.candleCount = 5;
        this.messages = [
            "Ты делаешь мир ярче! 🌟",
            "Спасибо за все твои улыбки! 😊",
            "Ты - самый удивительный человек! 💫",
            "Пусть все мечты сбудутся! 🌈",
            "Ты заслуживаешь всего самого лучшего! 🎉"
        ];
        this.blownCandles = 0;
        this.init();
    }

    init() {
        this.createSprinkles();
		this.createCandles();
        this.setupEventListeners();
    }
	
	createSprinkles() {
        const sprinkleColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#eb4d4b', '#a29bfe'];
        
        // Посыпка для нижнего слоя
        this.addSprinklesToLayer('bottom-sprinkles', 25, sprinkleColors);
        // Посыпка для среднего слоя
        this.addSprinklesToLayer('middle-sprinkles', 20, sprinkleColors);
        // Посыпка для верхнего слоя
        this.addSprinklesToLayer('top-sprinkles', 15, sprinkleColors);
    }

    addSprinklesToLayer(layerId, count, colors) {
        const layer = document.getElementById(layerId);
        
        for (let i = 0; i < count; i++) {
            const sprinkle = document.createElement('div');
            sprinkle.className = 'sprinkle';
            
            // Случайная позиция
            const left = Math.random() * 100;
            const animationDelay = Math.random() * 2;
            
            sprinkle.style.left = left + '%';
            sprinkle.style.background = colors[Math.floor(Math.random() * colors.length)];
            sprinkle.style.animationDelay = animationDelay + 's';
            
            layer.appendChild(sprinkle);
        }
    }
	
        createCandles() {
        const candlesContainer = document.querySelector('.candles');
        candlesContainer.innerHTML = '';
        
        for (let i = 0; i < this.candleCount; i++) {
            const candle = document.createElement('div');
            candle.className = 'candle';
            candle.innerHTML = `
                <div class="flame" data-candle="${i}"></div>
                <div class="candle-stick"></div>
            `;
            candlesContainer.appendChild(candle);
        }
    }

    setupEventListeners() {
        document.querySelectorAll('.flame').forEach(flame => {
            flame.addEventListener('click', (e) => {
                this.blowCandle(e.target);
            });
            this.addFlameAnimation(flame);
        });
    }

    blowCandle(flame) {
        if (flame.classList.contains('blown')) return;
        
        flame.classList.add('blown');
        this.blownCandles++;
        
        this.showMessage(this.messages[this.blownCandles - 1]);
        
        if (this.blownCandles === this.candleCount) {
            this.launchFinalSurprise();
        }
    }

    showMessage(message) {
        const messageEl = document.getElementById('birthday-message');
        messageEl.textContent = message;
        messageEl.style.opacity = '0';
        setTimeout(() => {
            messageEl.style.opacity = '1';
        }, 100);
    }

    addFlameAnimation(flame) {
        setInterval(() => {
            if (!flame.classList.contains('blown')) {
                flame.style.transform = `scale(${0.8 + Math.random() * 0.4})`;
            }
        }, 300);
    }

    launchFinalSurprise() {
        this.launchConfetti();
        setTimeout(() => {
            this.showMessage("С ДНЁМ РОЖДЕНИЯ! 🎂 Ты самый лучший!");
        }, 2000);
    }

    launchConfetti() {
        for (let i = 0; i < 50; i++) {
            this.createConfettiPiece();
        }
    }

    createConfettiPiece() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = this.getRandomColor();
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }

    getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#eb4d4b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Класс для музыки
class BirthdayMusic {
    constructor() {
        this.songs ='song.mp3'
        this.audio = new Audio();
        this.isPlaying = false;
        this.setupMusicButton();
    }

    setupMusicButton() {
        const musicBtn = document.getElementById('music-toggle');
        musicBtn.addEventListener('click', () => this.toggleMusic());
    }

    toggleMusic() {
        if (this.isPlaying) {
            this.audio.pause();
            document.getElementById('music-toggle').textContent = '🎵 Включить музыку';
        } else {
            this.audio.src = this.songs;
            this.audio.play().catch(e => {
                console.log('Нужно взаимодействие пользователя для воспроизведения музыки');
            });
            document.getElementById('music-toggle').textContent = '🔇 Выключить музыку';
        }
        this.isPlaying = !this.isPlaying;
    }
}

// Запуск всего когда страница загрузится
document.addEventListener('DOMContentLoaded', function() {
    // Запускаем торт
    new BirthdayCake();
    new BirthdayMusic();
    
    // Добавляем сообщение если изображения не загружены
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            this.style.background = '#f0f0f0';
            this.innerHTML = '<div>Фото не загружено</div>';
        };
    });
});