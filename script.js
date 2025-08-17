class KalcalaSurvey {
    constructor() {
        this.questions = [
            {
                id: 'q1',
                text: 'あなたの最も気になる体型のお悩みは？',
                key: 'main_concern',
                options: [
                    { value: 'A', text: '運動や食事制限だけでは解消できないお腹周りの脂肪' },
                    { value: 'B', text: '夕方になると靴がきつくなる脚のむくみ' },
                    { value: 'C', text: '季節を問わず感じる手足の冷え' }
                ]
            },
            {
                id: 'q2', 
                text: '理想のボディラインを目指す上で、最も重視したいことは？',
                key: 'goal_priority',
                options: [
                    { value: 'A', text: '無理のない食事や運動で健康的にお腹周りをスッキリさせること' },
                    { value: 'B', text: '一日中軽やかな足元で過ごせるようにむくみをケアすること' },
                    { value: 'C', text: '体の内側から温めて冷えにくい体を目指すこと' }
                ]
            },
            {
                id: 'q3',
                text: '普段の生活で、サプリメントを選ぶ際に重要視することは？',
                key: 'purchase_priority',
                options: [
                    { value: 'A', text: '科学的根拠に基づいた効果が期待できること' },
                    { value: 'B', text: '継続しやすい価格と信頼できる製薬会社が作っていること' },
                    { value: 'C', text: '全額返金保証などのサポート体制が充実していること' }
                ]
            }
        ];
        
        this.currentQuestionIndex = 0;
        this.answers = {};
        
        this.init();
    }
    
    init() {
        
    }
    
    showQuestion(questionIndex) {
        const question = this.questions[questionIndex];
        const questionContainer = document.getElementById('question-container');
        
        let optionsHTML = '';
        question.options.forEach(option => {
            optionsHTML += `
                <button class="option-btn" onclick="survey.answerQuestion('${option.value}')">
                    <span class="option-label">${option.value}:</span>
                    <span class="option-text">${option.text}</span>
                </button>
            `;
        });
        
        questionContainer.innerHTML = `
            <div class="question-text fade-in">
                <h3>${question.text}</h3>
                <p>質問 ${questionIndex + 1} / ${this.questions.length}</p>
            </div>
            <div class="question-options">
                ${optionsHTML}
            </div>
        `;
    }
    
    answerQuestion(answer) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.answers[currentQuestion.key] = answer;
        
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.questions.length) {
            setTimeout(() => {
                this.showQuestion(this.currentQuestionIndex);
            }, 300);
        } else {
            setTimeout(() => {
                this.showResults();
            }, 300);
        }
    }
    
    showResults() {
        document.getElementById('survey').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        
        // 2秒後に外部LPに遷移
        setTimeout(() => {
            window.location.href = 'https://shop.sain-clarte.com/kalcala/15_nensyo2_mu_ka.lp_ishi/sp.html';
        }, 2000);
    }
}

let survey;


document.addEventListener('DOMContentLoaded', function() {
    survey = new KalcalaSurvey();
    survey.showQuestion(0);
});