var array_doa = [
    "tahun ini bisa umroh", "rezekinya lancar", "dijauhkan dari marabahaya","suatu saat nanti punya usaha koskosan",
    "tahun ini kebeli mobil", "semakin kuat dalam menghadapi kehidupan", "mendapat rezeki yang melimpah","selalu bahagia bersama pasangan kamu",
    "tahun ini lebih hoki lagi","selalu dilimpahkan kebahagiaan","bisa umrohkan orang tua","ditahun ini semua impianmu terwujud",
    "taun depan punya rumah lagi", "besok ada yang ngajak jalan","segera mendapatkan apa yang kamu impikan",
    "hari ini ada yang traktir", "lebaran nanti sudah punya pasangan hidup","tahun 2024 lebih baik lebih bahagia",
    "diberikan kesehatan dan kekuatan", "dilancarkan usahanya", "diberikan keberuntungan dan keberkahan",
    "selalu bahagia bersama dirinya", "bulan depan punya motor baru","naik gaji",
    "minggu depan punya iPhone", "besok ada yang ngasih hadiah","menjadi orang yang sukses","kebeli sawah berhektarhektar",
    "segera dapat kerjaan lebih baik", "bisa jalan-jalan keluar negeri","bulan depan ada yang ngajak traveling",
    "minggu depan kebeli sekupi", "segera punya hape baru","apayang dicitacitakan bisa segera tercapai","besok ada yang ngajak hiling",
    "segera punya sepatu baru", "besok diangkat jadi sodara RafiAhmad","diberikan rizki yang melimpah",
    "selalu dipertemukan dengan orang baik", "selalu dicintai pasangan","besok ada yang ngajak liburan","diberikan kemudahan segala urusannya",
    "makin lancar rezekinya","lelahmu menjadi lillah",
    "suatu saat jadi sultan", "suatu saat nanti jadi pengusaha sukses","kehidupanmu menjadi lebih sukses lagi",
     "suatu saat nanti bisa merasakan apa yang RafiAhmad rasakan","panjang umur dan sehat selalu","kebeli tanah berhektarhektar",
    "suatu saat nanti punya usaha cucian mobil", "suatu saat nanti punya rumah mewah","hutangmu ada yang lunasi","besok yang ngajak shoping",
    "suatu saat nanti punya mobil alpard","dilancarkan usaha dan aktivitasnya","punya kontrakan 10 pintu","diberikan keturunan yg soleh dan solehah"
  ];

  var array_sambutan = [
    "yang tercinta", "yang kuat  kokoh dan terpercaya","yang kalau mandi sekali sehari","yang terindah dan tersayang", "yang sangat lucu", "yang sangat imut", "yang super cakep","yang masih jomblo haha","yang selalu dimanja nenek","yang selalu merindukan dia",
    "yang mempesona", "yang sedikit agak galak ","yang jutek banget", "yang mungil dan lucu","yang kalau lagi seneng suka lupain dia", "yang baik hati dan tidak sombong", "yang pintar merayu","yang saat ini sedang buka tiktok","kamu kemana aja?","yang citacitanya jadi orang kaya",
    "yang terhebat", "yang menawan nan rupawan", "yang sungguh aduhai","situkang bucin","yang masih suka ngompol","yang super seksi", "yang sangat cerdas","yang hanya ingin disayangi","yang selalu nurut apa kata orang tua","situkang gosting","yang hobinya tidur mulu","yang suka kabur kalau ditagih hutang",
    "yang baik hati","yang kalau makan bakso 2 mangkok","yang kalau tidur masih dikelonin", "yang cabi", "yang gemoy", "yang manis", "yang tersayang","yang punya hati yang tulus","yang merindukan dia dan dirinya","yang suka ngegosip","yang pinter ngegombal","jagon mamah",
    "yang super hebat","yang sedang memikirkan seseorang", "yang rajin menabung", "yang kalau makan ga cukup 2 piring","yang sopan dan santun","yang ingin punya pacar","yang masih cinta sama mantan","yang ingin diperhatikan","yang jarang mandi","yang masih sendiri","yang alergi kalau ga punya uang",
    "kesayangan mamah", "idaman mertua","kesayangan papah","yang sedang memikirkan masa depan", "kesayangan pacar","yang selalu galau","sipenakluk cinta","yang selalu merindu","yang masih kepoin mantan","yang punya kapal pesiar","bolehkan pinjem seratus","yang hobinya jajan seblak",
    "kesayangan mantan","yang sedang galau", "kesayangan keluarga","siraja gombal","yang kalau jajan suka lupa bayar", "yang tangguh dan kuat","yang selalu tersakiti","yang pinter ngomong","yang selalu gabut","yang selalu memaafkan","situkang makan","yang masih suka sama mantan",
    "yang rajin dan pandai","kesayangan nene","yang manja","yang baik hati","yang dermawan","yang dirindukan","yang dicintai umat manusia","yang cakep ga ada obat","pinjem seratus dulu bisa kali","yang belum mandi dari tadi pagi","yang rajin ibadah","kembanggan orang tua",
    "yang mageran","yang kalau makan 3 ngaku 2","yang disayangi tante","kamu apa kabar?","yang ingin kawin lagi","yang suka jajan sembarangan","yang selalu bahagia"," yang cantiknya kebangetan","yang suka jajan sembarangan","yang sedang memikirkan aku","yang rajin bekerja"
];

// This will use the demo backend if you open index.html locally via file://, otherwise your server will be used
let backendUrl =   "https://tiktok-chat-reader.zerody.one/" ;
let connection = new TikTokIOConnection(backendUrl);

// Counter
let viewerCount = 0;
let likeCount = 0;
let diamondsCount = 0;

// These settings are defined by obs.html
if (!window.settings) window.settings = {};

$(document).ready(() => {
    $('#connectButton').click(connect);
    $('#uniqueIdInput').on('keyup', function (e) {
        if (e.key === 'Enter') {
            connect();
        }
    });

    if (window.settings.username) connect();
})

function connect() {
    let uniqueId = window.settings.username || $('#uniqueIdInput').val();
    if (uniqueId !== '') {
        
        $('#stateText').text('Mohon tunggu jangan klik apapun dulu...');

        connection.connect(uniqueId, {
            enableExtendedGiftInfo: true
        }).then(state => {
            $('#stateText').text(`Berhasil dikoneksikan`);
            scrollToTop();
            tutupmodal();
            masukanpoto();
            aktifSuara("Berhasil di koneksikan ke akun "+uniqueId);
            $("#hide").hide();
            // reset stats
            viewerCount = 0;
            likeCount = 0;
            diamondsCount = 0;
            updateRoomStats();

        }).catch(errorMessage => {
            if(errorMessage=="Error: LIVE has ended"){
                $('#stateText').html("Gagal! tiktok <b>"+uniqueId+"</b> harus dalam keadaan LIVE.");
            }else if(errorMessage=="Error: Request failed with status code 429"){
                $('#stateText').text("Mohon maaf server sedang gangguan silahkan coba beberapa saat lagi. ");
            }else if(errorMessage=="Error: Request failed with status code 500"){
                $('#stateText').text("Mohon maaf server sedang gangguan silahkan coba beberapa saat lagi. ");
            }else{
                $('#stateText').text(errorMessage);
            }

            // schedule next try if obs username set
            if (window.settings.username) {
                setTimeout(() => {
                    connect(window.settings.username);
                }, 30000);
            }
        })

    } else {
        alert('no username entered');
    }
}

// Prevent Cross site scripting (XSS)
function sanitize(text) {
    return text.replace(/</g, '&lt;')
}

function updateRoomStats() {
    $('#roomStats').html(`Viewers: <b>${viewerCount.toLocaleString()}</b> Likes: <b>${likeCount.toLocaleString()}</b> Earned Diamonds: <b>${diamondsCount.toLocaleString()}</b>`)
}

function generateUsernameLink(data) {
    return `<a class="usernamelink" href="https://www.tiktok.com/@${data.uniqueId}" target="_blank">${data.uniqueId}</a>`;
}

function isPendingStreak(data) {
    return data.giftType === 1 && !data.repeatEnd;
}

/**
 * Add a new message to the chat container
 */

 
function addChatItem(color, data, text, summarize='',komen=false) {
    return false;
    const inputString = sanitize(text);
  

 
  //  let container_f = location.href.includes('obs.html') ? $('.eventcontainer') : $('.info_follow');
     let container = location.href.includes('obs.html') ? $('.eventcontainer') : $('.chatcontainer');
   // let joined =  location.href.includes('obs.html') ? $('.eventcontainer') : $('.joined');
            // let artinama = location.href.includes('obs.html') ? $('.eventcontainer') : $('.artinama');
    
  
   

    
    if (container.find('div').length > 500) {
        container.find('div').slice(0, 200).remove();
    }

    container.find('.temporary').remove();


if(komen==false || komen=="joined" || komen==""){
    var hasil = ""; var awalan = "";
}else{
        // var hasil_now = jawaban_now();
        // var kal = text.toLowerCase().includes(hasil_now.toLowerCase());
        // if(kal!==false){
            // var hasil = "-<i style='color:green'>Benar</i>"; 
             aktifSuara(data.comment);
              
        // }else{
        //       aktifSuara(data.comment+". salah." );
        //     var hasil = "-<i style='color:yellow'>Salah</i>" 
        // }
    
    // var awalan = "menjawab";
    //  jawaban(data.comment,data.profilePictureUrl,data.nickname)
}
    container.prepend(`
        <div    class=${summarize ? 'temporary' : 'static'}>
         <a target="new" href="javascript:ganti_bg('"${data.profilePictureUrl}"')">
            <img class="miniprofilepicture" src="${data.profilePictureUrl}">
            <span>
                <b>${generateUsernameLink(data)}</b>
                ${awalan} : <span style="color:${color}">${sanitize(text)}</span>  <i>${hasil}</i>
            </span>
        </a>    
        </div>
    `);
     
    // joined.html("Halo <img class='miniprofilepicture' src="+data.profilePictureUrl+"> <span style='color:green'>"+data.nickname+"</span> ayo saling follow");
    // aktifSuara("Halo "+data.nickname);
    // setTimeout(() => { 
    //     aktifSuara(sanitize(text));
    // }, 1000);
    // let follow=`<div><img class="miniprofilepicture" src="${data.profilePictureUrl}"> ${generateUsernameLink(data)} sepertinya follower km bertambah, selamat ya!!</div>`;
    // container_f.html(follow);
    // container.stop();
    // container.animate({
    //     scrollTop: container[0].scrollHeight
    // }, 400);
}

/**
 * Add a new gift to the gift container
 */
function addGiftItem(data) {
    // if(data.diamondCount==1){
    //     ajojing();
    // }else if(data.diamondCount==5){
    //     pokame();
    // }else if(data.diamondCount==10){
    //     cikini();
    // }else if(data.diamondCount==20){
    //     maemunah();
    // }else if(data.diamondCount==30){
    //     jandapirang();
    // }else{
    //     dumdum();
    // }
    // insert_gift(data.nickname,data.giftPictureUrl);
     
    // aktifSuara("makasih kak "+data.nickname+" sudah gift");
     
    
// openPopupTab(`<img class="img_profile" src="${data.profilePictureUrl}"> <br>makasih kak ${data.nickname}`);

    // let c_imageProfile = location.href.includes('obs.html') ? $('.eventcontainer') : $('.imageProfile');
   // let container = location.href.includes('obs.html') ? $('.eventcontainer') : $('.giftcontainer');
   //     let artinama = location.href.includes('obs.html') ? $('.eventcontainer') : $('.nama');

  
   
 
   
    // if (container.find('div').length > 200) {
    //     container.find('div').slice(0, 100).remove();
    // }

    // let streakId = data.userId.toString() + '_' + data.giftId;
    // aktifSuara("Terimakasih kak "+data.nickname+", semoga lancar rizkinya");
    // let imageProfile = `<b> <b class='nickname' onclick='openPopupTab("${data.nickname}")'>${data.nickname}</b> <br> <img class="gifticon" src="${data.giftPictureUrl}">
    // <br><img class="img_profile" src="${data.profilePictureUrl}"> <br>
    // <span class='follow'>Yuk follow  @${generateUsernameLink(data)} </span>
    // `;
   // let html = `<img  style="width:100%" src="${data.profilePictureUrl}">`;
   // let nama = data.nickname;

    // let existingStreakItem = container.find(`[data-streakid='${streakId}']`);

    // if (existingStreakItem.length) {
    //     existingStreakItem.replaceWith(html);
    // } else {
    //    container.html(html);
   //     artinama.html(nama);
    // }
    
    // artinama.html(imageProfile);
    // c_imageProfile.html(imageProfile);
    // c_imageProfile.stop();


    // container.stop();
    // container.animate({
    //     scrollTop: container[0].scrollHeight
    // }, 800);
}


// viewer stats
connection.on('roomUser', (msg) => {
    if (typeof msg.viewerCount === 'number') {
        viewerCount = msg.viewerCount;
        updateRoomStats();
    }
})

// like stats
connection.on('like', (msg) => {
    if (typeof msg.totalLikeCount === 'number') {
        likeCount = msg.totalLikeCount;
        updateRoomStats();
    }

    if (window.settings.showLikes === "0") return;

    if (typeof msg.likeCount === 'number') {
    //    addChatItem('#447dd4', msg, msg.label.replace('{0:user}', '').replace('likes', `${msg.likeCount} likes`),"","joined");
    addPhoto("small",msg.profilePictureUrl);
    }
})

// Member join
var urut_sifat=0;
let joinMsgDelay = 0;
connection.on('member', (msg) => {
    if (window.settings.showJoins === "0") return;

    let addDelay = 250;
    if (joinMsgDelay > 500) addDelay = 100;
    if (joinMsgDelay > 1000) addDelay = 0;

    joinMsgDelay += addDelay;
    // gift(msg.profilePictureUrl,msg.nickname,false,false);
    // setTimeout(() => {
        joinMsgDelay -= addDelay;
        // addChatItem('#21b2c2', msg, 'joined', true,"joined");
        addPhoto("small",msg.profilePictureUrl);
       
      
        

         
        
        let jumlahElemen = array_sambutan.length;
       if(urut_sifat>=(jumlahElemen-1)){
        urut_sifat=1;
       }else{
        urut_sifat++;
       }
       var sifat =  array_sambutan[urut_sifat];
       var string = msg.nickname;
       var nama = string.replace(/[^a-zA-Z]/g, '');

       var opsi = $("#opsi_suara").val();
       if(opsi==1){
           aktifSuara("selamat bergabung kak "+nama+" "+sifat,"join");
       }else{
           aktifSuara("selamat bergabung kak "+nama,"join");
       }



    // }, joinMsgDelay);
})

// New chat comment received
connection.on('chat', (msg) => {
    if (window.settings.showChats === "0") return;
  //  gift(msg.profilePictureUrl,msg.nickname,false,false,"chat",msg.comment);
   // addChatItem('', msg, msg.comment,'',true);
            // openPopupTab(``,`${msg.comment}`);
            addPhoto("small",msg.profilePictureUrl);
            addPhoto("small",msg.profilePictureUrl);
           aktifSuara(msg.comment,"komen");
          
})

// New gift received
var urut_doa = 0;
connection.on('gift', (data) => {
    if (!isPendingStreak(data) && data.diamondCount > 0) {
        diamondsCount += (data.diamondCount * data.repeatCount);
        updateRoomStats();
    }

    if (window.settings.showGifts === "0") return;

    // addGiftItem(data);
    // gift(data.profilePictureUrl,data.nickname,true);

    if (!data.repeatEnd) {
        
   
    if(data.diamondCount<=5){
        
        for(i=1;i<=data.diamondCount;i++)
        {
            addPhoto("medium",data.profilePictureUrl);
            addPhoto("small",data.profilePictureUrl);
            addPhoto("small",data.profilePictureUrl);
        }
        
    
        
        
    }else if(data.diamondCount<=10){

        for(i=1;i<=data.diamondCount;i++)
        {
            addPhoto("medium",data.profilePictureUrl); 
        }
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        
         
        for(i=1;i<=20;i++)
        {
            addPhoto("small",data.profilePictureUrl);
        }
    }else if(data.diamondCount<=30){

        for(i=1;i<=data.diamondCount;i++)
        {
            addPhoto("medium",data.profilePictureUrl); 
        }
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
         
        for(i=1;i<=20;i++)
        {
            addPhoto("small",data.profilePictureUrl);
        }
    }else if(data.diamondCount<=100){

        for(i=1;i<=data.diamondCount;i++)
        {
            addPhoto("medium",data.profilePictureUrl); 
        }
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
        addPhoto("large",data.profilePictureUrl); 
         
        for(i=1;i<=20;i++)
        {
            addPhoto("small",data.profilePictureUrl);
        }
    }else{
      
        for(i=1;i<=100;i++)
        {
            addPhoto("large",data.profilePictureUrl);
        }

        for(i=1;i<=30;i++)
        {
            addPhoto("medium",data.profilePictureUrl);
        }
    }


   
     

      let jumlahElemen = array_doa.length;
      if(urut_doa>=(jumlahElemen-1)){
        urut_doa=1;
      }else{
        urut_doa++;
      }
      var doa= array_doa[urut_doa];

      var string = data.nickname;
      var nama = string;//.replace(/[^a-zA-Z]/g, '');


      var opsi = $("#opsi_suara").val();
      if(opsi==1){
        aktifSuara("Terimakasih kak "+nama+"  sudah kasih "+data.giftName+" semoga "+doa+".","gift");
      }else{
        aktifSuara("Terimakasih kak "+nama+"  sudah kasih "+data.giftName+" semoga berkah","gift");
      }


          
    




        }     
})

// share, follow
connection.on('social', (data) => {
    if (window.settings.showFollows === "0") return;

    let color = data.displayType.includes('follow') ? '#ff005e' : '#2fb816';
    if(color=='#ff005e'){
        aktifSuara("Terimakasih kak "+data.nickname+"  sudah jadikan aku teman","follow");
        addPhoto("small",data.profilePictureUrl);
    }else{
        aktifSuara("Terimakasih kak "+data.nickname+"  sudah sherr","share");
        addPhoto("small",data.profilePictureUrl);
    }
 
})

connection.on('streamEnd', () => {
    $('#stateText').text('Stream ended.');

    // schedule next try if obs username set
    if (window.settings.username) {
        setTimeout(() => {
            connect(window.settings.username);
        }, 30000);
    }
})
