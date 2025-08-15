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
        document.getElementById('result').style.display = 'block';
        
        const resultContent = document.getElementById('result-content');
        const personalizedMessage = this.generatePersonalizedMessage();
        
        resultContent.innerHTML = personalizedMessage;
        resultContent.parentElement.classList.add('fade-in');
    }
    
    generatePersonalizedMessage() {
        const { main_concern, goal_priority, purchase_priority } = this.answers;
        let message = '<h3>あなたにぴったりのKALCALAがあります！</h3>';
        
        // メインの悩み別メッセージ
        if (main_concern === 'A') {
            message += '<p><strong>お腹周りの脂肪</strong>でお悩みのあなたへ。KALCALAに含まれる<strong>ブラックジンジャー由来ポリメトキシフラボン</strong>が、BMIが高めの方のお腹の脂肪を減らすのを助けます。</p>';
            message += '<p class="note" style="font-size: 0.9rem; color: #666; margin: 0.5rem 0;">※BMI高めの方</p>';
        } else if (main_concern === 'B') {
            message += '<p><strong>脚のむくみ</strong>でお悩みのあなたへ。KALCALAの<strong>ヒハツ由来ピペリン</strong>が、夕方の脚のむくみを軽減し、軽やかな足元をサポートします。</p>';
            message += '<p class="note" style="font-size: 0.9rem; color: #666; margin: 0.5rem 0;">※病的ではない一過性のむくみ</p>';
        } else if (main_concern === 'C') {
            message += '<p><strong>手足の冷え</strong>でお悩みのあなたへ。KALCALAの<strong>ヒハツ由来ピペリン</strong>が、末梢血流量を増加させ、冷えの軽減をサポートします。</p>';
            message += '<p class="note" style="font-size: 0.9rem; color: #666; margin: 0.5rem 0;">※末梢血流量を増加させ、冷えの軽減に役立つ機能が報告されています</p>';
        }
        
        // 目標に応じた追加メッセージ
        if (goal_priority === 'A') {
            message += '<p>🌟 健康的にスッキリを目指すあなたにピッタリの機能性表示食品です。</p>';
        } else if (goal_priority === 'B') {
            message += '<p>🌟 一日中軽やかでいたいあなたの願いを叶える成分が配合されています。</p>';
        } else if (goal_priority === 'C') {
            message += '<p>🌟 体の内側から温まって、冷えにくい体づくりをサポートします。</p>';
        }
        
        // 購入動機に応じたメッセージ
        if (purchase_priority === 'A') {
            message += '<p>✅ <strong>機能性表示食品</strong>として消費者庁に届出済み。科学的根拠に基づいた効果が期待できます。</p>';
        } else if (purchase_priority === 'B') {
            message += '<p>✅ <strong>初回1,980円</strong>で始められ、2回目以降も20%OFF。信頼の品質をお得に続けられます。</p>';
        } else if (purchase_priority === 'C') {
            message += '<p>✅ <strong>全額返金保証</strong>付きで安心。休止・解約もいつでも可能です。</p>';
        }
        
        return message;
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