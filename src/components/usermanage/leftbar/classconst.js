import classes from './tabitems.module.css'
import * as commonshared  from '../../commoncss/classconst';


export const main_content = [commonshared.main_tab_content]
main_content.push(commonshared.w_container)
main_content.push(commonshared.flex)
main_content.push(classes.column)

export const  font_1_bold_text_dark = commonshared.font_1_bold_text_dark

export const react_tabs =[classes.react_tabs]
export const react_tabs__tab_profile =[classes.react_tabs__tab_profile]
export const react_tabs__tab_profile__selected =classes.react_tabs__tab_profile__selected
export const react_tabs__tab_profile__list =[classes.react_tabs__tab_profile__list]
react_tabs__tab_profile__list.push(classes.invisible_scrollbar)

export const popupnotification = [classes.popupnotification]



