const settings = [
    {
        words: [
            'うら',
            'ウラ',
            'やは',
            'ヤハ',
            'ヤハ!!',
            'ヤハ！',
            'usagi',
            'Usagi',
            'ハァ？',
            'ハァ！？',
            'ハァ!?',
            'プルルル',
            'プルルルルルルル',
            'フゥン',
            'フゥン？',
            'ツツウラウラ',
            'プルャ',
        ],
    },
];

export const makeRegexp = (): RegExp => {
    return new RegExp(settings.map(({ words }) => words.join('|')).join('|'));
};
