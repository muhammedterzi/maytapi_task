# Maytapi API Task

Bu repoda verilen [task](https://docs.google.com/document/d/1E6NPFkdZBhbjoOd2m-8rq8qbkEP5eU2wEMT_YXOQxxg/edit?tab=t.0) doğrultusunda talep edilen görevleri yerine getirdim.

***

## Mesaj Gönderme (text,poll,media)

Bu alanda gönderilen mesajların, nasıl gönderildiği ile alakalı bilgiler yer alacak.

Tüm proje localdaki 80 portundan işlem görmektedir.
Kullanım için <mark>mesaj</mark> ön tanımı ile gönderilmek istenen tür belirtilerek istek yollanır.

>**Örneğin:** Anket türünde bir mesaj göndermek istiyorsam http://localhost/mesaj/poll ile istek yollamalıyım.

1. #### Text Mesaj Türü
    * API'yi kullanmak için POSTMAN ile POST tipinde istek yollayacağız 
(<mark>http://localhost/mesaj/text<mark>)
    * text türü için gerekli bilgiler; 
       * **toNumber** : alıcının numarası
       * **message** : mesaj içeriği 
     
       ```json
       // Örnek kullanım

       {
         "toNumber": "905555555555",
         "message": "Hello World!"
       }
       ```
2. #### Poll Mesaj Türü
    * API'yi kullanmak için POSTMAN ile POST tipinde istek yollayacağız 
(<mark>http://localhost/mesaj/poll<mark>)
    * poll türü için gerekli bilgiler; 
       * **toNumber** : alıcının numarası
       * **message** : anketin mesaj içeriği 
       * **options** : anketin seçenekleri
       * **only_one** : bir veya birden çok seçime izin kontrolü      
       ```json
       // Örnek kullanım

       {
         "toNumber": "905555555555",
          "message": "Tavşanlar Kaç Ayaklıdır?",
          "options": [2","4"],
          "only_one": true
       }
       ```
3. #### Media Mesaj Türü
    * API'yi kullanmak için POSTMAN ile POST tipinde istek yollayacağız 
(<mark>http://localhost/mesaj/media<mark>)
    * media türü için gerekli bilgiler; 
       * **toNumber** : alıcının numarası
       * **message** : gönderilecek media içeriğinin bağlantısı (direkt url veya base64 gibi bir formatta gönderim yapabilirsiniz)
       * **text** : media içeriğinin whatsapp'da görünecek mesaj içeriği
      ```json
       // Örnek kullanım

       {
         "toNumber": "905555555555",
          "message": "https://cdn-icons-png.flaticon.com/512/25/25231.png",
          "text": "GitHub'ın logosunu size gönderdim"
       }
      ```
      ```json
       // Örnek kullanım 2

       {
         "toNumber": "905555555555",
          "message": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAA...",
          "text": "GitHub'ın logosunu size gönderdim"
       }
   
## Mesaj Alma

Bu adımdaki gereksinimleri tamamlayamadım. Araştırmalarım sonucunda webhook ile mesaj dönüt işlemlerinin (iletildi,  görüldü, mesaj alındı vb.) yapılabileceğini anladım. Fakat araştırdığımda bu işlem için bir sunucuya ihtiyacımın olduğunu ve o sunucudan da benim API'ye istekte bulunmam gerektiğini anladım.