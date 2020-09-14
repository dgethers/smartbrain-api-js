exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(() => {
            // Inserts seed entries
            return knex('users')
                .insert([
                    {
                        id: 1,
                        name: 'Avatar Korra',
                        email: 'avatar-korra@gmail.com',
                        entries: 0,
                        joined: new Date()
                    },
                    {
                        id: 2,
                        name: 'Crazy Jane',
                        email: 'doom.patrol.girl@gmail.com',
                        entries: 0,
                        joined: new Date()

                    }
                ]);
        });
};
