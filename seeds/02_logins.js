exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('login')
        .del()
        .then(() => {
            // Inserts seed entries
            return knex('login')
                .insert([
                    {
                        id: 1,
                        hash: '$2a$10$AoDN9l03wHK8hf6avhpW7.vZkXgIEEbFXACTNtOgGarN6z8m7Pj.i',
                        email: 'avatar-korra@gmail.com'
                    },
                    {
                        id: 2,
                        hash: '$2b$04$LF32px3c/GLTWZVywURPjujRTJVW7NT7dPlj6RGSD7WHjFRo2d0XO',
                        email: 'doom.patrol.girl@gmail.com'
                    }
                ])
        });
};
