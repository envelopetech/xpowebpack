import React, { Component } from 'react';
import {get_user_feeds_comments, delete_user_comments} from '../../actions/streamlines/dataactions';
import {get_user_wings_feeds_comments, delete_user_wing_feeds_comments} from '../../actions/wings/dataactions'
import Node from './Node'
import * as classshared from './classconst';
import{ProfilepicType, PageType} from '../../shared/utility'



class usercommentslist extends Component {

    constructor(props)
    {           
        super(props)
        this.state={            
            commentsdata:null,
            user_post_id:props.user_post_id,
            loggedin_user_id:props.loggedin_user_id,            
        }
    }
    filldata()
    {         
        var data=null;
        if(this.props.PageType === PageType.userwings)
        {
            data= get_user_wings_feeds_comments(this.state.user_post_id)
        }
        else
        {
            data= get_user_feeds_comments(this.state.user_post_id)
        }        
        data.then(res=>
        {
            if(res !== undefined)
            {                  
                if(res.data["error"] === undefined)
                {                                        
                    this.setState( { commentsdata:res.data});                      
                }                
            }                                       
        });          
    }
    componentDidMount(){         
        this.filldata();           
    }
    callback = (data) => {         
        if(data.new !== null && data.new !== undefined && data.new.length > 0)
        { 
            if(data.new[0]["verb"] === "comment")         
            {
                //let id = data.new[0]["user_comment_id"] 
                //var listdata= get_comments_by_id(id)                 
                var listdata=null;
                if(this.props.PageType === PageType.userwings)
                {
                    listdata= get_user_wings_feeds_comments(this.state.user_post_id)
                }
                else
                {
                    listdata= get_user_feeds_comments(this.state.user_post_id)
                }           
                
                listdata.then(res=>
                {                 
                    if(res.data["error"] === undefined)
                    {                      
                        this.setState({ commentsdata: res.data})                
                        //this.setState({ commentsdata: [...this.state.commentsdata, res.data[0]]})
                        
                    }
                });  
            }                   
        }
    }
    deletecommenthandler = (event,id, index) => {   
        //alert(id)     
        event.preventDefault(); 
        const dataval = {
            id: id
        };
        var data=null;
        if(this.props.PageType === PageType.userwings)
        {
            data= delete_user_wing_feeds_comments(dataval)
        }
        else
        {
            data= delete_user_comments(dataval)
        }        
        data.then(res=>
        {
            if(res !== undefined)
            {                  
                if(res.data ===  true)
                {                                        
                    const commentsdata = Object.assign([], this.state.commentsdata);
                    commentsdata.splice(index,1);
                    this.setState({commentsdata: commentsdata});
                }                
            }                                       
        }); 
    }
    render()
    {    

        let list=[];
        list = this.state.commentsdata;        
        let nodes=[];  
        if(list !== null)
        {              
            if(list.length > 0)
            {
                // nodes = list.map(function(comments) {                   
                //     return (
                //       <Node id={comments.id} node={comments} children={comments.children} commentusertype={ProfilepicType.user_nav__user_photo_xxsmall_with_margin} ischild={false} current_user_profile_pic_url={this.props.current_user_profile_pic_url}/>
                //     );
                // });                     

                list.map( (item,i)  => {             
                  let detail = 
                              <Node node={item} children={item.children}   
                                PageType={this.props.PageType}
                                btnlistdeleteedit={this.props.btnlistdeleteedit}
                                btnuserpostmore={this.props.btnuserpostmore}
                                doticons={this.props.doticons}
                                commentusertype={ProfilepicType.user_nav__user_photo_xxsmall_with_margin} 
                                ischild={false}
                                deletecommenthandler={( event ) => this.deletecommenthandler( event, item.id, i)}
                                current_user_profile_pic_url={this.props.current_user_profile_pic_url} 
                                is_show_reply_commentbox={false}/>
                                       
                  return(
                    nodes.push(<React.Fragment key={item.id}>{detail}</React.Fragment>)
                  )
              })    

            }           
        } 
        
        return(
            <React.Fragment>                
                <ul className={classshared.comments_list}>
                    {nodes}
                </ul>                                 
            </React.Fragment>
        )
    }
}
export default usercommentslist;