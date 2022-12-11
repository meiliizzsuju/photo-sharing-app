export default {
  name: 'pin',
  title: 'Pin',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'about',
      title: 'About',
      type: 'string'
    },
    {
      name: 'destination',
      title: 'Destination',
      type: 'url'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'userId',
      title: 'UserID',
      type: 'string'
    },
    {
      name: 'posted',
      title: 'Posted',
      type: 'postedBy'
    },
    {
      name: 'save',
      title: 'Save',
      type: 'array',
      of: [
        {type: 'save'}
      ]
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {type: 'comment'}
      ]
    },
  ]
}