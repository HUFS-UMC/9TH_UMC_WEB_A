//콘솔창에 있는걸 만들어준다.
// adult
// : 
// false
// backdrop_path
// : 
// "/1RgPyOhN4DRs225BGTlHJqCudII.jpg"
// genre_ids
// : 
// Array(4)
// 0
// : 
// 16
// 1
// : 
// 28
// 2
// : 
// 14
// 3
// : 
// 53
// length
// : 
// 4
// [[Prototype]]
// : 
// Array(0)
// id
// : 
// 1311031
// original_language
// : 
// "ja"
// original_title
// : 
// "劇場版「鬼滅の刃」無限城編 第一章 猗窩座再来"
// overview
// : 
// "The Demon Slayer Corps are drawn into the Infinity Castle, where Tanjiro, Nezuko, and the Hashira face terrifying Upper Rank demons in a desperate fight as the final battle against Muzan Kibutsuji begins."
// popularity
// : 
// 511.9346
// poster_path
// : 
// "/sUsVimPdA1l162FvdBIlmKBlWHx.jpg"
// release_date
// : 
// "2025-07-18"
// title
// : 
// "Demon Slayer: Kimetsu no Yaiba Infinity Castle"
// video
// : 
// false
// vote_average
// : 
// 7.802
// vote_count
// : 


// 393
export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null; 
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

// string | null : TMDB필드중 *_path는 종종 null이므로 string | null로 두는게 안전하다.
// page
// : 
// 1
// results
// : 
// (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// total_pages
// : 
// 52710
// total_results
// : 
// 1054185
// ->이때까지 우리는 results에 각각의 영화요소들 무비에 관한 배열을 위에 export type Movie로 정의한것 뿐이다.
//그래서 이제 page, total_pages_total_results를 받는것을 만들어주자.

export type MovieResponse = {
  page:number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}