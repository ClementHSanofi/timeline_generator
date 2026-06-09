
/** Generate fake data for generating a timeline by default
 * @return {TimelineEvent[]}
*/
export function fakeData() {
    return [
        {
            date: "2020-01-15",
            time: "14:30",
            title: "Lancement du projet",
            description: "Le projet a été officiellement lancé avec une réunion d'équipe.",
            isPrimary: true,
        },
        {
            date: "2020-03-10",
            time: "09:00",
            title: "Phase de recherche",
            description: "Début de la phase de recherche pour collecter des données et analyser les besoins.",
            isPrimary: false,
        },
        {
            date: "2020-06-20",
            time: "16:00",
            title: "Développement de la première version",
            description: "La première version du produit a été développée et testée en interne.",
            isPrimary: false,
        },
        {
            date: "2020-09-05",
            time: "11:00",
            title: "Lancement de la version bêta",
            description: "La version bêta a été lancée pour un groupe restreint d'utilisateurs afin de recueillir des retours.",
            isPrimary: false,
        },
    ];
}