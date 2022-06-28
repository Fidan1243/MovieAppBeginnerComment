import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieComment } from '../models/comment';
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
  comments:MovieComment[]=[];
  id:any="";

  constructor(private movieService:MovieService,
    private movieCommentServ:MovieCommentService,
              private activatedRouted:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.activatedRouted.params.subscribe(params=>{
      this.id=params["movieId"];
      this.movieService.getMovieById(params["movieId"])
      .subscribe(data=>{
        this.movie=data;
      })
    })
    this.activatedRouted.params.subscribe(params=>{
      this.movieCommentServ.getComments(params["movieId"])
      .subscribe(data=>{
        this.comments=data;
      })
    })
  }

  createComment(comment:string){
    const commentS:MovieComment= {
      title:comment,
      movieId:this.id
    }
this.movieCommentServ.createComment(commentS).subscribe(data=>{this.router.navigate(['/movies'])});
  }

}