
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
        {
            date: "2020-12-15",
            time: "10:00",
            title: "Lancement officiel",
            description: "Le produit a été officiellement lancé sur le marché avec une campagne de marketing.",
            isPrimary: false,
        },
        {
            date: "2021-03-01",
            time: "15:00",
            title: "Mise à jour majeure",
            description: "Une mise à jour majeure a été déployée avec de nouvelles fonctionnalités et améliorations.",
            isPrimary: false,
        },
        {
            date: "2021-06-10",
            time: "13:00",
            title: "Atteinte de 10 000 utilisateurs",
            description: "Le produit a atteint la barre des 10 000 utilisateurs actifs.",
            isPrimary: false,
        },
    ];
}