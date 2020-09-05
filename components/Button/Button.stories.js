import Button from '.'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

// We create a “template” of how args map to rendering

const Template = (args) => <Button {...args} >Hello</Button>;

// Each story then reuses that template
export const Primary = Template.bind({});

Primary.args = {
  onClick: null,
};


