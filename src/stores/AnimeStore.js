import Reflux from "reflux";

import AnimeActions from "../actions/AnimeActions";

export default Reflux.createStore({
  init: function() {
    this.listenToMany(AnimeActions);
    this.data = [];
  },
  onLoadData: function() {
      this.data = [{
        title: "Guilty Crown",
        image: "http://cdn.myanimelist.net/images/anime/8/33713l.jpg",
        alternativeTitles: [{
          language: "japanese",
          title: "ギルティクラウン"
        }],
        synopsis: "The story takes place in Tokyo in 2039, after the outbreak of the 'Apocalypse Virus' during what became known as the 'Lost Christmas' of 2029. Since then, Japan has been under the control of the multinational organization called GHQ.Ouma Shu is a 17 - year - old boy who mistakenly obtains a rare and great power.He can use this power,'The Right Hand of the King,'to extract 'voids,' or tools / weapons that are the manifestations of peoples ' hearts.He has been rather shy since a childhood tragedy, but both his personality and life change forever when he meets a girl named Yuzuriha Inori, a member of the rebel group called 'Funeral Parlor,' whose members seek the restoration of self - government in Japan via the ousting of GHQ.",
        status: "Finished Airing",
        airDate_start: "Oct 14, 2011",
        airDate_end: "Mar 23, 2012",
        producers: ["Production I.G", "Aniplex", "Dentsu", "FUNimation Entertainment", "Movic", "Fuji TV", "Fuji Pacific Music Publishing"],
        genres: ["Action", "Drama", "Sci-Fi", "Shounen", "Super Power"],
        duration: "24 min. per episode",
        episodes: [{
          title: "Outbreak:Genesis",
          airDate: "Oct 13, 2011 (JST)"
        }, {
          title: "The Fittest:Survival of the Fittest",
          airDate: "Oct 20, 2011 (JST)"
        }]
      }, {
        title: "Hellsing Ultimate",
        image: "http://cdn.myanimelist.net/images/anime/6/7333l.jpg",
        alternativeTitles: [{
          language: "english",
          title: "Hellsing Ultimate"
        }, {
          language: "japanese",
          title: "HELLSING OVA"
        }],
        synopsis: "Hellsing, a secret organization of the British government, has long been battling supernatural threats to keep the people safe from creatures of the night. The current leader, Integra Wingates Hellsing controls her own personal army to eliminate the undead beings, but even her highly trained soldiers pale in comparison to her most trusted vampire exterminator, a man by the name of Alucard, who is actually a powerful vampire himself. Along with Integra's mysterious butler and Alucard's new vampire minion, Seras Victoria, The Hellsing Organization must face not only regular ghouls and vampires, but a rivaling secret organization from the Vatican, and Millennium, an enigmatic group of madmen spawned by a certain war over 50 years ago... A bloody battle between monsters is about to begin. The dead are dancing, and all hell is singing...",
        status: "Finished Airing",
        airDate_start: "Feb 10, 2006",
        airDate_end: "Dec 26, 2012",
        producers: ["Madhouse", "Geneon Universal Entertainment", "Satelight", "FUNimation Entertainment", "StudioRF Inc.", "Graphinica"],
        genres: ["Action", "Horror", "Vampire", "Supernatural", "Military", "Seinen"],
        duration: "50 min. per episode",
        episodes: [{
          title: "Outbreak:Genesis",
          airDate: "Oct 13, 2011 (JST)"
        }, {
          title: "The Fittest:Survival of the Fittest",
          airDate: "Oct 20, 2011 (JST)"
        }]
      }];

      this.trigger(this.data);
    }
    /*onTestDelete: function(id) {
      this.list.splice(id, 1);
      this.trigger(this.list);
    },
    onTestDeleteAll: function() {
      this.list = [];
      this.trigger(this.list);
    }*/
});
