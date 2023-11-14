import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';


interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

@Component({
    selector:'app-public',
    templateUrl:'./public.component.html',
    styleUrl:'./public.component.scss'
})

export class PublicComponent implements OnInit {
    public loading!: boolean;
    public isAuthenticated!: boolean;
    public title!: string;
    public userName!:string;

    public isBypass!: boolean;
    public mobile!: boolean;
    public isMenuInitOpen!: boolean;
  
    constructor(private breakpointObserver: BreakpointObserver,
                private _snackBar: MatSnackBar) { 
                  this.dataSource.data = TREE_DATA;
                }
  

      public isMenuOpen = true;
      public contentMargin = 240;
  
      get isHandset(): boolean {
        return this.breakpointObserver.isMatched(Breakpoints.Handset);
      }

      ngOnInit() {
        this.isMenuOpen = true;
        this.title = 'InOffice';
        this.userName = "Luis Alberto Mosquera";
      }

      ngDoCheck() {
          if (this.isHandset) {
            this.isMenuOpen = false;
          } else {
            this.isMenuOpen = true;
          }
      }
  
    public openSnackBar(msg: string): void {
      this._snackBar.open(msg, 'X', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'notif-error'
      });
    }
  
    public onSelectOption(option: any): void {
      const msg = `Chose option ${option}`;
      this.openSnackBar(msg);
    }

    treeControl = new NestedTreeControl<FoodNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<FoodNode>();
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}