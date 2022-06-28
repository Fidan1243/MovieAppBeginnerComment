import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Category } from "../models/category";


@Injectable()
export class CategoryService{
    url="https://angular-movie-app-a83af-default-rtdb.firebaseio.com/";

    constructor(private http:HttpClient){

    }

    getCategories():Observable<Category[]>{
        return this.http.get<Category[]>(this.url+"categories.json").pipe(
            map(response=>{
                const movies:Category[] = [];
                for(const key in response){
                     
                        movies.push({...response[key],id:key});
                }
                return movies;
            }),
            tap(data => console.log(data))
        );
    }

    createCategory(category:Category):Observable<Category>{
        return this.http.post<Category>(this.url+"categories.json",category);
    }
}