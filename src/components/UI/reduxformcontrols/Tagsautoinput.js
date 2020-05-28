import React from 'react'
import { TagsSelect } from "react-select-material-ui";
import { Form } from 'semantic-ui-react'

const Tagsautoinput = (props) => {
  return (
    <Form.Field error={props.meta.touched && !!props.meta.error} width={props.width}>
      <TagsSelect
        label={props.placeholder}
        //   values={[
        //     "product-1",
        //     " product-2",
        //     " product-3"
        // ]}
        tabIndex={props.tabIndex}
        values={props.selectedvalues}
        options={props.tags}
        onChange={props.handleChange}
        className={props.className}
        SelectProps={{
          isCreatable: true,
          msgNoOptionsAvailable: "All tags are selected",
          msgNoOptionsMatchFilter: "No tag matches the filter"
        }}
      />
    </Form.Field>
  )
}
export default Tagsautoinput
