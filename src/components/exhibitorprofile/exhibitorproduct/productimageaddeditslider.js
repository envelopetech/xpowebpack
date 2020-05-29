import React from 'react';
import * as classshared from '../../commoncss/classconst';
import LazyImage from '../../UI/lazyloading/lazyloading';
import Button from '../../UI/Button/Button';


class productimageaddeditslider extends React.Component {
    render() {
        let imagediv = null
        let primarybuttondiv = null
        //let checkboxdiv = <input checked={this.props.is_primary} type="checkbox" id="makeitprimaryimage" name="makeitprimary" onChange={this.props.makeitprimaryimage}></input>
        if (this.props.is_primary) {
            imagediv = <img src={this.props.product_image} alt="" className={classshared.img_block} />
        }
        else {
            imagediv = <img src={this.props.product_image} alt="" className={classshared.img_block_small} />
            primarybuttondiv = <Button buttontype="button"
                id="makeitprimaryimage"
                svgclass={classshared.icon_20_icon_blue.join(' ')}
                icon={this.props.primaryicon}
                clicked={this.props.makeitprimaryimage}>
            </Button>
        }
        let divactionrender = null;
        divactionrender = <React.Fragment>
            {primarybuttondiv}
            {
                !this.props.is_primary ?
                    (<Button buttontype="button"
                        id="imagedeletebutton"
                        svgclass={classshared.icon_20_icon_blue.join(' ')}
                        icon={this.props.deleteicon}
                        clicked={this.props.deleteimagefromlist}>
                    </Button>) : null

            }
        </React.Fragment>
        let imagerender = null
        if (this.props.is_lazyloading) {
            imagerender = <div className={classshared.show_image_button}>
                <LazyImage
                    srcset={this.props.product_image}
                    src={this.props.product_image}
                    classname={classshared.img_block.join(' ')} />
                {divactionrender}
            </div>
        }
        else {
            imagerender = <div className={classshared.show_image_button}>{imagediv}
                {divactionrender}
            </div>
        }
        return (
            <React.Fragment>
                {imagerender}
            </React.Fragment>
        )
    }
}
export default productimageaddeditslider;