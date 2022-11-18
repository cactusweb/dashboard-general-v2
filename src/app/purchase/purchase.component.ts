import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { LicenseOwner } from '../license-list/interfaces/license-owner';
import { HttpService } from '../tools/services/http.service';
import { PurchaseService } from './services/purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  providers: [PurchaseService],
  host: {
    '[style.--primary-color]': 'ownerData?.primary_color || ""',
    '[style.--primary-color--hover]': 'ownerData?.primary_color+"99" || ""',
  }
})
export class PurchaseComponent implements OnInit {
  purchaseState: Observable<'btn'|'form'|'payment'|'status-failed'|'status-success'|'status-payment-failed'>
  ownerData!: LicenseOwner

  constructor(
    private purchase: PurchaseService,
  ) {
    this.purchaseState = purchase.$purchaseState.asObservable();
  }

  ngOnInit(): void {  
    this.getOwner();
  }


  getOwner(){
    this.purchase.getOwner()
      .pipe(
        take(1)
      )
      .subscribe({
        next: v => this.ownerData = v,
        error: err => {}
      })
  }

}
