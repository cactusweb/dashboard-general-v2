import { Component, OnInit, Output } from '@angular/core';
import { finalize, take } from 'rxjs';
import { PurchaseService } from '../../services/purchase.service';

@Component({
  selector: 'drop-status-btn',
  templateUrl: './drop-status-btn.component.html',
  styleUrls: ['./drop-status-btn.component.scss']
})
export class DropStatusBtnComponent implements OnInit {
  loading: boolean = true;
  isActive: boolean = false;

  constructor(
    public purchase: PurchaseService
  ) { }

  ngOnInit(): void {
    this.getDrop();
  }

  getDrop(){
    this.purchase.getDrop()
      .pipe(
        take(1),
        finalize(() => this.loading = false),
      )
      .subscribe({
        next: () => this.isActive = true,
        error: () => this.isActive = false
      })
  }

}
