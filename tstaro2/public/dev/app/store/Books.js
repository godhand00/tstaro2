Ext.define('tstaro2.store.Books', {
    extend: 'Ext.data.Store',
    model: 'tstaro2.model.Book',
    autoLoad: true,
    pageSize: 25,
    sorters: {property: 'regno', direction: 'DESC'},
    remoteSort: true,
    sortOnLoad: true,
    proxy: {
        type: 'ajax',
        url: '/api/getbooks/' + 'sudako',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'totalCount'
        },
        writer: {
            type: 'json',
            //getRecordData: function(record) {
            rootProperty: function(record) {
                var now = new Date()
                if (!record.data.regdate) {
                    record.data = Ext.apply(record.data, {
                        regdate: now
                    })
                }
                return Ext.apply(record.data, {
                    upddate: now
                })
            }
        }
    }
})
