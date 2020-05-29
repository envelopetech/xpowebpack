
import * as commonshared  from '../../commoncss/classconst';
import classes from './tabitem.module.css'

export const react_tabs =[classes.react_tabs]
export const react_tabs__tab_exhibitor =[classes.react_tabs__tab_exhibitor]
export const react_tabs__tab_exhibitor__selected =classes.react_tabs__tab_exhibitor__selected;
export const react_tabs__tab_exhibitor__list =[classes.react_tabs__tab_exhibitor__list]
react_tabs__tab_exhibitor__list.push(classes.invisible_scrollbar)
export const blurdiv = commonshared.blurdiv

export const main_content = [commonshared.w_container]
main_content.push(commonshared.flex)
main_content.push(classes.column)
main_content.push(commonshared.main_content_padding_without_top)
