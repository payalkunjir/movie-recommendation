import { Component } from '@angular/core';
import { MovieService } from './movie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];
  durations = ['Short', 'Medium', 'Long'];
  moods = ['Happy', 'Relaxed', 'Excited', 'Adventurous'];

  movieForm!:FormGroup;
  norecord:boolean=false;
  recommendation:any= [];
  constructor(private movieService: MovieService, private fb:FormBuilder) {
    this.movieForm=this.fb.group({
      genre:['',Validators.required],
      duration:['',Validators.required],
      mood:['',Validators.required]
    })
  }


  onSubmit() {
    if (!this.movieForm.invalid) {
      this.movieService.getRecommendation(this.movieForm.value).subscribe(
        (response) => {
          console.log(response);
          if(response.success==true)
          {
            this.recommendation = response.data;
            this.norecord=false;
          }
          else
          {
             this.norecord=true
          }

        },
        (error) => {
          console.error('Error fetching recommendation:', error);
          this.recommendation = 'Something went wrong. Please try again.';
        }
      );
    } else {
      this.recommendation = 'Please fill in all fields.';
    }
  }
}
