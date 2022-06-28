import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieCommentService } from '../services/movie.comment.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  providers:[MovieService,MovieCommentService]
})
export class MovieDetailsComponent implements OnInit {

  movie:Movie;

  constructor(private movieService:MovieService,
    private movieCommentServ:MovieCommentService,
              private activatedRouted:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRouted.params.subscribe(params=>{
      this.movieService.getMovieById(params["movieId"])
      .subscribe(data=>{
        this.movie=data;
      })
    })
    this.movieCommentServ.
  }

  AddComment(comment:string){
this.movieCommentServ.createComment(comment,this.movie.id);
  }

}