Ext.define('tstaro2.model.Book', {
    extend: 'Ext.data.Model',
    fields: [ 
        'ASIN', 
        //'regno', 
        { name: 'regno', type: 'int' },
        'Title', 
        'Author', 
        'Publisher', 
        { name: 'page', type: 'int' }, 
        { name: 'price', type: 'int' },
        { name: 'pubdate', type: 'date' }, 
        'LargeImageURL', 
        'DetailPageURL', 
        'description', 
        'comment', 
        'NDC',
        'NDC9',
        'tags', 
        'supplier',
        { name: 'purchdate', type: 'date' },
        { name: 'regdate', type: 'date' } , 
        { name: 'upddate', type: 'date' }, 
        { name: 'void_p', type: 'boolean' }, 
        '_id'
    ],
    idProperty: '_id'
})
