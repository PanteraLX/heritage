import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, UrlSegment } from '@angular/router';
import { faColumns, faUser, faUsers, faUserPlus, IconDefinition, faUserFriends } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'heritage-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public faUsers: IconDefinition = faUsers;
  public faUser: IconDefinition = faUser;
  public faColumns: IconDefinition = faColumns;
  public faUserPlus: IconDefinition = faUserPlus;
  public faUserFriends: IconDefinition = faUserFriends;


  private currentRoute: string;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.url.subscribe((paramMap: UrlSegment[]) => {
      const firstSegment = paramMap.shift();
      this.currentRoute = firstSegment && firstSegment.path ? firstSegment.path : '';
    });
  }
}
