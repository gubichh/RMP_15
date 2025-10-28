// notes.js
const Notes = (() => {
    const KEY = 'apple-like-notes';
    const read = () => JSON.parse(localStorage.getItem(KEY) || '[]');
    const write = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

    // стартовые данные (один раз)
    if (!localStorage.getItem(KEY)) {
        write([
            { id: crypto.randomUUID(), title:'Мобильный "Матвей"', text:'Макеты, шрифты, переходы и темы…', checklist:[], links:[], pinned:false, updatedAt: Date.now()-2*86400000 },
            { id: crypto.randomUUID(), title:'Покупки', text:'молоко, хлеб, курица…', checklist:[{text:'молоко',done:true},{text:'хлеб',done:false}], links:[], pinned:false, updatedAt: Date.now()-5*86400000 },
            { id: crypto.randomUUID(), title:'Тема проекта', text:'структура экранов, состояния, роутинг', checklist:[], links:['https://example.com/spec'], pinned:true, updatedAt: Date.now()-12*86400000 },
        ]);
    }

    const all = () => read().sort((a,b)=>b.updatedAt-a.updatedAt);
    const get = (id) => all().find(n=>n.id===id);
    const create = (partial={}) => {
        const n = { id: crypto.randomUUID(), title:'', text:'', checklist:[], links:[], pinned:false, updatedAt: Date.now(), ...partial };
        const arr = read(); arr.push(n); write(arr); return n.id;
    };
    const save = (note) => {
        const arr = read();
        const i = arr.findIndex(n=>n.id===note.id);
        if (i>=0) arr[i]=note; else arr.push(note);
        write(arr);
    };
    const remove = (id) => write(read().filter(n=>n.id!==id));
    const togglePin = (id) => {
        const arr = read(); const i = arr.findIndex(n=>n.id===id);
        if (i>=0){ arr[i].pinned=!arr[i].pinned; write(arr);}
    };
    const search = (q) => {
        const items = all();
        if(!q) return items;
        q = q.toLowerCase();
        return items.filter(n=>(n.title||'').toLowerCase().includes(q) || (n.text||'').toLowerCase().includes(q));
    };
    const word = (n, forms)=>{
        const m=n%100; if(m>10&&m<20) return forms[2];
        const k=n%10; if(k===1) return forms[0]; if(k>=2&&k<=4) return forms[1]; return forms[2];
    };
    return {all,get,create,save,remove,togglePin,search,word};
})();
