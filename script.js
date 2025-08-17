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
        
        // 質問が存在しない場合のエラーハンドリング
        if (!question) {
            console.error('質問が見つかりません:', questionIndex);
            return;
        }
        
        let optionsHTML = '';
        question.options.forEach((option, index) => {
            optionsHTML += `
                <button class="option-btn" onclick="survey.answerQuestion('${option.value}')" 
                        style="animation-delay: ${index * 0.1}s">
                    <span class="option-label">${option.value}:</span>
                    <span class="option-text">${option.text}</span>
                </button>
            `;
        });
        
        questionContainer.innerHTML = `
            <div class="question-text">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${((questionIndex + 1) / this.questions.length) * 100}%"></div>
                </div>
                <h3>${question.text}</h3>
                <p class="question-counter">質問 ${questionIndex + 1} / ${this.questions.length}</p>
            </div>
            <div class="question-options">
                ${optionsHTML}
            </div>
        `;
        
        // コンテナにフェードインアニメーションを追加
        questionContainer.classList.add('fade-in');
        
        // オプションボタンにフェードインアニメーションを追加
        setTimeout(() => {
            const optionButtons = questionContainer.querySelectorAll('.option-btn');
            optionButtons.forEach((btn, index) => {
                setTimeout(() => {
                    btn.classList.add('fade-in-option');
                }, index * 100);
            });
        }, 100);
    }
    
    answerQuestion(answer) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.answers[currentQuestion.key] = answer;
        
        // 現在の質問をフェードアウト
        const questionContainer = document.getElementById('question-container');
        questionContainer.classList.add('slide-out');
        questionContainer.classList.remove('fade-in');
        
        setTimeout(() => {
            this.currentQuestionIndex++;
            
            if (this.currentQuestionIndex < this.questions.length) {
                // 次の質問を表示
                questionContainer.classList.remove('slide-out');
                this.showQuestion(this.currentQuestionIndex);
            } else {
                // 最後の質問に答えた場合、ローディング画面を表示
                this.showLoading();
            }
        }, 300);
    }
    
    showLoading() {
        // アンケート画面を非表示
        document.getElementById('survey').style.display = 'none';
        
        // ローディング画面を表示
        const loadingSection = document.getElementById('loading');
        loadingSection.style.display = 'block';
        loadingSection.classList.add('fade-in');
        
        // ローディングメッセージを更新
        const loadingTitle = document.querySelector('.loading-title');
        const loadingSubtitle = document.querySelector('.loading-subtitle');
        
        if (loadingTitle) {
            loadingTitle.textContent = 'あなたに最適なものを用意しています';
        }
        if (loadingSubtitle) {
            loadingSubtitle.textContent = '素敵な商品ページへご案内します...';
        }
        
        // 3秒後に大正製薬の公式LPに遷移
        setTimeout(() => {
            window.location.href = 'https://www.taisho-direct.jp/simages/lp/KTP_con_af.html';
        }, 3000);
    }
    
    showResults() {
        // ローディング画面を非表示
        document.getElementById('loading').style.display = 'none';
        // 結果画面を表示
        document.getElementById('result').style.display = 'block';
        
        const resultContent = document.getElementById('result-content');
        const personalizedMessage = this.generatePersonalizedMessage();
        
        resultContent.innerHTML = personalizedMessage;
        resultContent.parentElement.classList.add('fade-in');
    }
    
    generatePersonalizedMessage() {
        const { main_concern, goal_priority, purchase_priority } = this.answers;
        let message = '<h3>診断結果</h3>';
        message += '<div class="result-summary">';
        
        // メインの悩み別メッセージ
        if (main_concern === 'A') {
            message += '<div class="main-result"><h4>お腹周りの脂肪へのアプローチ</h4>';
            message += '<p>KALCALAに含まれる<strong>ブラックジンジャー由来ポリメトキシフラボン</strong>が、BMIが高めの方のお腹の脂肪を減らすのを助けます。</p>';
            message += '<p class="disclaimer">※BMI高めの方対象</p></div>';
        } else if (main_concern === 'B') {
            message += '<div class="main-result"><h4>脚のむくみケア</h4>';
            message += '<p>KALCALAの<strong>ヒハツ由来ピペリン</strong>が、夕方の脚のむくみを軽減し、軽やかな足元をサポートします。</p>';
            message += '<p class="disclaimer">※病的ではない一過性のむくみ対象</p></div>';
        } else if (main_concern === 'C') {
            message += '<div class="main-result"><h4>冷えの軽減サポート</h4>';
            message += '<p>KALCALAの<strong>ヒハツ由来ピペリン</strong>が、末梢血流量を増加させ、冷えの軽減をサポートします。</p>';
            message += '<p class="disclaimer">※末梢血流量を増加させ、冷えの軽減に役立つ機能が報告されています</p></div>';
        }
        
        // 目標に応じた追加メッセージ
        message += '<div class="secondary-benefits">';
        if (goal_priority === 'A') {
            message += '<p class="benefit-point">健康的なボディケアを目指す方に適した機能性表示食品です。</p>';
        } else if (goal_priority === 'B') {
            message += '<p class="benefit-point">一日中快適に過ごしたい方をサポートする成分が配合されています。</p>';
        } else if (goal_priority === 'C') {
            message += '<p class="benefit-point">体の内側からのケアで、冷えにくい体づくりをサポートします。</p>';
        }
        message += '</div>';
        
        // 購入動機に応じたメッセージ
        message += '<div class="trust-points">';
        if (purchase_priority === 'A') {
            message += '<div class="trust-item"><strong>機能性表示食品</strong><span>消費者庁に届出済み。科学的根拠に基づいた効果が期待できます。</span></div>';
        } else if (purchase_priority === 'B') {
            message += '<div class="trust-item"><strong>初回価格1,980円</strong><span>継続しやすい価格設定で、2回目以降も20%OFFでご利用いただけます。</span></div>';
        } else if (purchase_priority === 'C') {
            message += '<div class="trust-item"><strong>安心保証付き</strong><span>全額返金保証付きで、休止・解約もいつでも可能です。</span></div>';
        }
        message += '</div>';
        
        message += '</div>';
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