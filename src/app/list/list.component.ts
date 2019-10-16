import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

// mock input data
// const HAS_SEARCHBAR = true;
// const LIST_TITLE = 'Rules';
// const ROWS_DATA = [
//   {
//     img: {
//       src: 'assets/rule-icon.svg',
//       type: 'icon'
//     },
//     text: 'Rule Name',
//     chips: [
//       {
//         label: 'Item word distance',
//         backgroundColor: '#262E47',
//         fontColor: '#FFFFFF'
//       },
//       {
//         label: '13 items',
//         backgroundColor: '#E8F6FF',
//         fontColor: '#262E47'
//       }
//     ]
//   },
//   {
//     img: {
//       src: 'assets/rule-icon.svg',
//       type: 'icon'
//     },
//     text: 'Rule Name',
//     chips: [
//       {
//         label: 'Item word distance',
//         backgroundColor: '#262E47',
//         fontColor: '#FFFFFF'
//       },
//       {
//         label: '13 items',
//         backgroundColor: '#E8F6FF',
//         fontColor: '#262E47'
//       }
//     ]
//   },
//   {
//     img: {
//       src: 'assets/rule-icon.svg',
//       type: 'icon'
//     },
//     text: 'Rule Name',
//     chips: [
//       {
//         label: 'Item word distance',
//         backgroundColor: '#262E47',
//         fontColor: '#FFFFFF'
//       },
//       {
//         label: '13 items',
//         backgroundColor: '#E8F6FF',
//         fontColor: '#262E47'
//       }
//     ]
//   },
//   {
//     img: {
//       src: 'assets/rule-icon.svg',
//       type: 'icon'
//     },
//     text: 'Rule Name',
//     chips: [
//       {
//         label: 'Item word distance',
//         backgroundColor: '#262E47',
//         fontColor: '#FFFFFF'
//       },
//       {
//         label: '13 items',
//         backgroundColor: '#E8F6FF',
//         fontColor: '#262E47'
//       }
//     ]
//   }
// ];

// UNCOMMENT FOR ITEM GROUP MOCK DATA
const HAS_SEARCHBAR = true;
const LIST_TITLE = 'Item Groups';
const HAS_CHECKBOX_ROW = false;
const HAS_MEATBALL_MENU = true;
const ROWS_DATA = [
  {
    img: {
      backgroundColor: '#D4F7F0',
      mainColor: '#37A38D'
    },
    text: 'Call Greetings',
    chips: [
      {
        label: '13 Rules',
        backgroundColor: '#f9daac',
        fontColor: '#B78538'
      },
      {
        label: '13 items',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      },
      {
        label: '95% OK',
        backgroundColor: '#C2F3E9',
        fontColor: '#37A38D'
      }
    ]
  },
  {
    img: {
      backgroundColor: '#FEE1EA',
      mainColor: '#FE6093'
    },
    text: 'Sales Introduction',
    chips: [
      {
        label: '20 Rules',
        backgroundColor: '#f9daac',
        fontColor: '#B78538'
      },
      {
        label: '13 items',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      },
      {
        label: '15% OK',
        backgroundColor: '#fee3ec',
        fontColor: '#FE6093'
      }
    ]
  },
  {
    img: {
      backgroundColor: '#f9daac',
      mainColor: '#FEAC60'
    },
    text: 'Product Offering',
    chips: [
      {
        label: '13 Rules',
        backgroundColor: '#f9daac',
        fontColor: '#B78538'
      },
      {
        label: '13 items',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      },
      {
        label: '75% OK',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      }
    ],
  },
  {
    img: {
      backgroundColor: '#f9daac',
      mainColor: '#FEAC60'
    },
    text: 'Product Offering',
    chips: [
      {
        label: '13 Rules',
        backgroundColor: '#f9daac',
        fontColor: '#B78538'
      },
      {
        label: '13 items',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      },
      {
        label: '75% OK',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      }
    ],
  },
  {
    img: {
      backgroundColor: '#f9daac',
      mainColor: '#FEAC60'
    },
    text: 'Product Offering',
    chips: [
      {
        label: '13 Rules',
        backgroundColor: '#f9daac',
        fontColor: '#B78538'
      },
      {
        label: '13 items',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      },
      {
        label: '75% OK',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      }
    ],
  },
  {
    img: {
      backgroundColor: '#f9daac',
      mainColor: '#FEAC60'
    },
    text: 'Product Offering',
    chips: [
      {
        label: '13 Rules',
        backgroundColor: '#f9daac',
        fontColor: '#B78538'
      },
      {
        label: '13 items',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      },
      {
        label: '75% OK',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      }
    ],
  },
  {
    img: {
      backgroundColor: '#f9daac',
      mainColor: '#FEAC60'
    },
    text: 'Product Offering',
    chips: [
      {
        label: '13 Rules',
        backgroundColor: '#f9daac',
        fontColor: '#B78538'
      },
      {
        label: '13 items',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      },
      {
        label: '75% OK',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      }
    ],
  },{
    img: {
      backgroundColor: '#f9daac',
      mainColor: '#FEAC60'
    },
    text: 'Product Offering',
    chips: [
      {
        label: '13 Rules',
        backgroundColor: '#f9daac',
        fontColor: '#B78538'
      },
      {
        label: '13 items',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      },
      {
        label: '75% OK',
        backgroundColor: '#E8F6FF',
        fontColor: '#262E47'
      }
    ],
  }
];

// UNCOMMENT FOR ITEM MOCK DATA
// const HAS_SEARCHBAR = true;
// const LIST_TITLE = 'Item Groups';
// const ROWS_DATA = [
//   {
//     img: {
//       mainColor: '#37A38D'
//     },
//     text: 'Call Greetings',
//     chips: [
//       {
//         label: '13 Rules',
//         backgroundColor: '#f9daac',
//         fontColor: '#B78538'
//       },
//       {
//         label: '13 items',
//         backgroundColor: '#E8F6FF',
//         fontColor: '#262E47'
//       },
//       {
//         label: '95% OK',
//         backgroundColor: '#C2F3E9',
//         fontColor: '#37A38D'
//       }
//     ]
//   },
//   {
//     img: {
//       mainColor: '#FE6093'
//     },
//     text: 'Sales Introduction',
//     chips: [
//       {
//         label: '20 Rules',
//         backgroundColor: '#f9daac',
//         fontColor: '#B78538'
//       },
//       {
//         label: '13 items',
//         backgroundColor: '#E8F6FF',
//         fontColor: '#262E47'
//       },
//       {
//         label: '15% OK',
//         backgroundColor: '#fee3ec',
//         fontColor: '#FE6093'
//       }
//     ]
//   },
//   {
//     img: {
//       mainColor: '#FEAC60'
//     },
//     text: 'Product Offering',
//     chips: [
//       {
//         label: '13 Rules',
//         backgroundColor: '#f9daac',
//         fontColor: '#B78538'
//       },
//       {
//         label: '13 items',
//         backgroundColor: '#E8F6FF',
//         fontColor: '#262E47'
//       },
//       {
//         label: '75% OK',
//         backgroundColor: '#E8F6FF',
//         fontColor: '#262E47'
//       }
//     ]
//   }
// ];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() title: string;
  @Input() rows: any[];
  @Input() totalRows: number;
  @Input() hasSearchbar: boolean;
  @Input() hasHeaderChip: boolean;
  @Input() hasCheckboxRow: boolean;
  @Input() hasMeatballMenu: boolean;

  visibleRows: any[];
  filterValue: string;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.registerSvgAssets();
  }

  ngOnInit() {
    this.title = LIST_TITLE;
    this.rows = ROWS_DATA;
    this.hasSearchbar = HAS_SEARCHBAR;
    this.hasCheckboxRow = true;
    this.hasMeatballMenu = HAS_MEATBALL_MENU;
    this.visibleRows = this.rows;
    this.totalRows = this.totalRows || this.rows.length;
  }

  handleFilterInput() {
    if (!this.filterValue || !this.filterValue.length) {
      this.visibleRows = this.rows;
    } else {
      this.visibleRows = this.filterRows();
    }
  }

  isIcon(img) {
    return img.type === 'icon';
  }

  getCheckedRows() {
    return this.rows.filter(row => row.checked);
  }

  private filterRows() {
    return this.rows.filter(row => 
      row.text.toLowerCase().includes(this.filterValue.toLowerCase()) ||
        this.filterChips(row.chips).length
    )
  }

  private filterChips(chips) {
    return chips.filter(chip => chip.label.toLowerCase().includes(this.filterValue.toLowerCase()))
  }

  private registerSvgAssets() {
    this.matIconRegistry.addSvgIcon(
      'oval-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/list/oval.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'meatball-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/list/meatball.svg')
    );
  }

}