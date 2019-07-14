import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-student-onboard',
  templateUrl: './student-onboard.component.html',
  styleUrls: ['./student-onboard.component.css']
})
export class StudentOnboardComponent implements OnInit {
  isLoading = false;
  universityControl = new FormControl();
  universities: string[];
  filteredUniversities: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.universities = [
      'Curtin University',
      'Edith Cowan University',
      'Murdoch University',
      'University of Notre Dame Australia',
      'University of Western Australia',
      'Australian Catholic University',
      'Australian Catholic University',
      'Australian National University',
      'Bond University',
      'Charles Darwin University',
      'Charles Sturt University',
      'CQUniversity',
      'Curtin University',
      'Deakin University',
      'Edith Cowan University',
      'Federation University Australia',
      'Flinders University',
      'Griffith University',
      'James Cook University',
      'La Trobe University',
      'Macquarie University',
      'Monash University',
      'Murdoch University',
      'Queensland University of Technology',
      'RMIT University',
      'Southern Cross University',
      'Swinburne University of Technology',
      'Torrens University Australia',
      'University of Adelaide',
      'University of Canberra',
      'University of Divinity',
      'University of Melbourne',
      'University of New England',
      'University of New South Wales',
      'University of Newcastle',
      'University of Notre Dame Australia',
      'University of Queensland',
      'University of South Australia',
      'University of Southern Queensland',
      'University of Sydney',
      'University of Tasmania',
      'University of Technology Sydney',
      'University of the Sunshine Coast',
      'University of Western Australia',
      'University of Wollongong',
      'Victoria University',
      'Western Sydney University',
    ];

    this.filteredUniversities = this.universityControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.universities.filter(option => option.toLowerCase().includes(filterValue));
  }
}
