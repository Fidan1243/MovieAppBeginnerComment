import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { MovieComment } from "../models/comment";


@Injectable()
export class MovieCommentService{
    url="https://angular-movie-app-a83af-default-rtdb.firebaseio.com/";
    the_url =this.url+"comments.json";
    constructor(private http:HttpClient){

    }

    getComments(movieId:any):Observable<MovieComment[]>{
        return this.http.get<MovieComment[]>(this.the_url).pipe(
            map(response=>{
                const movies:MovieComment[] = [];
                for(const key in response){
                     if(movieId){
                        if(movieId == response[key].movieId){
                            movies.push({...response[key],id:key});

                        }
                     }
                }
                return movies;
            }),
            tap(data => console.log(data))
        );
    }

    createComment(category:MovieComment):Observable<MovieComment>{
        console.log(category);
        return this.http.post<any>(this.the_url,category);
    }
}