'use strict';

const dialogify = function (talker, talkee, subj = 0) {//subj= 0: selamlar, 1: muhabbet, 2:quests, 3: hoşçakal
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
                                func: function name() {
                                    subj = 1;
                                },}
                            ],
                        ],
                    ],
                ],
            ],
        ];
        
        let dialogue = getRandEl(_dialogues[subj][talkee.status][talkee.sex][talkee.age][talkee.psychology][0]);

        let dialogueObj = _dialogues[subj][talkee.status][talkee.sex][talkee.age][talkee.psychology][1];
        dialogueObj.func();
        let dia = Object.assign({}, {dialogue}, dialogueObj);
        if (Object.keys({talker} === "player")){//talker oyuncu (player) ise
            return textAdd(foot, dia.dialogue);
        };
        
        //
        return dia;
    };


//const questify;