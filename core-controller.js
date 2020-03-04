class CoreController {
    static spin() {        
        const spinResult = this.getSpinResult();
        const quests = this.getQuests();
        const matrix = spinResult.matrix;
        const money = spinResult.spentMoney;
        const length = matrix.length;

        let row = '';
        let i, j, sequence;

        //  Matrix to console
        for (i = 0; i < 3; i++) {
            row += matrix[i] + ' ';
            for (j = i + 3; j < length; j += 3)
                row += matrix[j] + ' ';
            console.log(row);
            row = '';
        }

        //  Quests checks
        for (let spin = 0; spin < 12; spin++) {
            quests.forEach(quest => {
                if (quest.questType == 'do_spin') {
                    if (!quest.isCompleted) {
                        if (++quest.userQuestValue == quest.questValue) {
                            quest.isCompleted = true;
                            quest.dateCompleted = new Date();
                            console.log('12 spins achievement');
                        }
                    }
                }
                else if (quest.questType == 'spent_money') {
                    if (!quest.isCompleted) {
                        quest.userQuestValue += money;
                        if (quest.userQuestValue >= quest.questValue) {
                            quest.isCompleted = true;
                            quest.dateCompleted = new Date();
                            console.log('2000 coins spent achievement');
                        }
                    }
                }
                else if (quest.questType == 'combo_row') {
                    if (!quest.isCompleted) {
                        for (i = 0; i < 3; i++) {
                            sequence = 1;
                            for (j = i + 3; j < length; j += 3) {
                                if (matrix[j] == matrix[j - 3]) {
                                    if (++sequence > 2) {
                                        if (++quest.userQuestValue == quest.questValue) {
                                            quest.isCompleted = true;
                                            quest.dateCompleted = new Date();
                                            console.log('Combo row achievement');
                                        }
                                    }
                                }
                                else
                                    sequence = 1;
                            }
                        }
                    }
                }
                else if (quest.questType == 'get_symbol') {
                    if (!quest.isCompleted) {
                        matrix.forEach(symbol => {
                            if (symbol == 71) {
                                quest.isCompleted = true;
                                quest.dateCompleted = new Date();
                                console.log('Symbol achievement');
                            }
                        });
                    }
                }
            });
        }
    }

    static getQuests() {
        return [
            {
                id: 1,
                userId: 1,
                questType: 'do_spin',
                questValue: 12,
                userQuestValue: 0,
                isCompleted: false,
                dateCompleted: null
            },
            {
                id: 1,
                userId: 1,
                questType: 'spent_money',
                questValue: 2000,
                userQuestValue: 0,
                isCompleted: false,
                dateCompleted: null
            },
            {
                id: 1,
                userId: 1,
                questType: 'combo_row',
                questValue: 2,
                userQuestValue: 0,
                isCompleted: false,
                dateCompleted: null
            },
            {
                id: 1,
                userId: 1,
                questType: 'get_symbol',
                questValue: 1,
                userQuestValue: 0,
                isCompleted: false,
                dateCompleted: null
            }
        ]
    }

    static getSpinResult() {
        return {
            matrix: [1, 3, 7, 2, 3, 5, 6, 3, 4, 7, 2, 71, 9, 9, 4],
            spentMoney: 1000,
        }
    }
}

module.exports = CoreController;

function start() {
    CoreController.spin();
}

start();