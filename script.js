class KalcalaSurvey {
    constructor() {
        this.questions = [
            {
                id: 'q1',
                text: 'お腹の脂肪が気になりますか？',
                key: 'belly_fat'
            },
            {
                id: 'q2', 
                text: '脚のむくみが気になりますか？',
                key: 'leg_swelling'
            },
            {
                id: 'q3',
                text: '冷えを感じやすいですか？',
                key: 'cold_sensitivity'
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
        
        questionContainer.innerHTML = `
            <div class="question-text fade-in">
                <h3>${question.text}</h3>
                <p>質問 ${questionIndex + 1} / ${this.questions.length}</p>
            </div>
            <div class="question-options">
                <button class="option-btn" onclick="survey.answerQuestion(true)">はい</button>
                <button class="option-btn" onclick="survey.answerQuestion(false)">いいえ</button>
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
        document.getElementById('result').style.display = 'block';
        
        const resultContent = document.getElementById('result-content');
        let personalizedMessage = '<h3>あなたにぴったりの効果があります！</h3>';
        
        const messages = [];
        
        if (this.answers.belly_fat) {
            messages.push({
                text: 'あなたのお腹の脂肪のお悩みには、KALCALAに含まれる<strong>ブラックジンジャー</strong>がおすすめです！',
                note: '※BMI高めの方'
            });
        }
        
        if (this.answers.leg_swelling) {
            messages.push({
                text: '脚のむくみにお悩みですね。KALCALAの<strong>ヒハツ</strong>が、むくみ軽減をサポートします！',
                note: '※病的ではない一過性のむくみ'
            });
        }
        
        if (this.answers.cold_sensitivity) {
            messages.push({
                text: '冷えにお悩みなら、KALCALAに含まれる<strong>ヒハツ</strong>がおすすめです！',
                note: '※末梢血流量を増加させ、冷えの軽減に役立つ機能が報告されています'
            });
        }
        
        if (messages.length === 0) {
            personalizedMessage += '<p>KALCALAは様々な健康効果をサポートする機能性表示食品です。あなたの健康的な毎日をお手伝いします。</p>';
        } else {
            messages.forEach(message => {
                personalizedMessage += `<p>${message.text}</p>`;
                personalizedMessage += `<p class="note" style="font-size: 0.9rem; color: #666; margin-top: 0.5rem;">${message.note}</p>`;
            });
        }
        
        resultContent.innerHTML = personalizedMessage;
        resultContent.parentElement.classList.add('fade-in');
    }
}

let survey;

function startSurvey() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('survey').style.display = 'block';
    
    survey = new KalcalaSurvey();
    survey.showQuestion(0);
}

function goToPurchase() {
    alert('購入ページに遷移します（実際の実装では購入フォームページに遷移）');
}

document.addEventListener('DOMContentLoaded', function() {
    
});