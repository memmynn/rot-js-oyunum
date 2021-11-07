'use strict';

const dialogify = function (subj = 0, status = 0, sex = 0, age = 0, psychology = 0) {//subj= 0: selamlar, 1: muhabbet, 2:quests, 3: hoşçakal
                                //status = 0: köylü, 10:soylu, 
                                //sex = 0: erkek, 1: kadın, 
                                //age = 0: 0-5, 1: 6-13, 2: 14-18, 3: 18-30, 4:31-40, 5: 41-58, 6:59-72, 7:73++
                                //psychology = 0: unfriendly, 1: normal, 2: friendly
        const _dialogues=[
            [//selamlar
                [//köylü
                    [//erkek
                        [//bebek
                            [//unfriendly:
                            ["Hey fool!",
                            "Hey idiot!",
                            "I don't like ya!"],
                            {next: 1,
                                func: function name(params) {
                                    
                                },}
                            ],
                        ],
                    ],
                ],
            ],
        ];
        
        let dialogue = _dialogues[subj][status][sex][age][psychology];
        return Object.assign({}, dialogue[0], dialogue[1]);
    };