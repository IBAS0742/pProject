export const pageInfo = {
  id: 'id',
  name: 'name',
  link: 'link',
  content: {
    __method__(data) {
      return {
        content: JSON.parse(data.content)
      }
    },
    // __name__: 'content',
    __info__: {
      content: 'content'
    }
  },
  bak: {
    __method__(data) {
      return JSON.parse(data.bak)
    },
    __name__: 'bak',
    __info__: {
      fileName: 'fileName'
    }
  },
  layout: {
    __method__(data) {
      return JSON.parse(data.layout)
    },
    __name__: 'layout',
    __info__: {
      layoutId: 'layoutId',
      attr: 'attr'/*{
        __method__(layout) {
          return {
            attr: JSON.parse(layout.attr)
          }
        },
        __info__: {
          attr: 'attr'
        }
      }*/
    }
  },
  pageTwo: 'projectId'
};

export const pageInfoToDB = {
  id: {
    field:'id'
  },
  name: {
    field: 'name'
  },
  link: {
    field: 'link'
  },
  content: {
    dear(data) {
      return JSON.stringify(data.content);
    }
  },
  bak: {
    dear(data) {
      return JSON.stringify(data.bak);
    }
  },
  layout: {
    dear(data) {
      return JSON.stringify(data.layout);
    }
  },
  pageTwo: {
    field: 'projectId'
  }
};
