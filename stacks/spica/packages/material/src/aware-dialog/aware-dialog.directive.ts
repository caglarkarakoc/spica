import {Directive, EventEmitter, HostListener, Input, Output} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";

import {MatAwareDialogComponent} from "./aware-dialog.component";
import {MatAwareDialogOptions} from "./options";

@Directive({selector: "[matAwareDialog]", exportAs: "matAwareDialog"})
export class MatAwareDialogDirective {
  @Input("matAwareDialog") options: MatAwareDialogOptions;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  constructor(private matDialog: MatDialog) {}

  @HostListener("click")
  open(): void {
    this.matDialog
      .open(MatAwareDialogComponent, {data: this.options})
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.confirm.emit();
        } else {
          this.cancel.emit();
        }
      });
  }
}
