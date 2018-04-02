(function() {
 let cena = Math.round((Math.random() * (100 - 5 + 1) + 5) * 100) / 100; // losuje cenę
 let portfel = Math.floor(Math.random() * (100 - 5 + 1) + 5); // losuje portwel
 console.log("Portfel wylosował: " + portfel); // takie tam informacje
 let buton = document.getElementById("sprawdzam"); // pobiera guzik
 let przeladuj = document.getElementById("reload"); // przycisk do rozpoczęcia nowej rundy
 let reszta = document.getElementById("reszta"); // pobiera pole input
 var punkt = localStorage.getItem("punkty", punkt);


 /*
 funkcja naprawPortfel sprawdza czy w portwelu jest więcej kasy niż
 trzeba zapłacić. Zwraca wartośc zmiennej portwel powiekszoną o losową liczbę,
 jeżeli cena jest wyższa niż to co było w portwelu na starcie.
 Ale jak to w życiu bywa, czasami jest za mało pieniędzy w portwelu.
 Jeżeli wylosowana liczba pierwotnie jest większa od ceny to zwracana jest
 wartość portfela bez dodawania dodatkowej liczby.
 */
 let naprawPortfel = function() {
  if (cena > portfel) {
   let dodaj = Math.floor(Math.random() * (100 - 10 + 1) + 10);
   portfel += dodaj;
   console.log("Trzeba było dołożyc do portfela: " + dodaj + " Teraz portfel to: " + portfel);
   return portfel;
  } else {
   console.log('Wszystko gra, cena jest mniejsza od portfela')
   return portfel;
  }
 };
 let roznica = Math.round((naprawPortfel() - cena) * 100) / 100; // oblicza i zaokrągla resztę do dwóch miejsc po przecinku
 if (roznica < 0) {
  window.location.reload(true);
 }
 /* wyrażenie funkcyjne wyswietl
  wyświetla wylosowane liczby w panelu gry
 */
 let wyswietl = function() {
  let punktacja = document.getElementById("punktacja");
  let kasa_zl = document.getElementById("kasa_zl");
  let wPortfel = document.getElementById("portfel");
  kasa_zl.innerHTML = cena;
  wPortfel.innerHTML = portfel;
  punktacja.innerHTML = "<p>Zgadłeś: " + localStorage.getItem("punkty", punkt) + " razy.</p>";
 }
 wyswietl();


 /* wyrażenie funkcyjne porownaj
  porónuje wpisaną liczbę z różnicą portwel - cena i wyświetla komuniakt w zależności od wyniku
 */
 let porownaj = function() {
  let komunikat = document.getElementById("komunikat");
  if (roznica == reszta.value) {
   komunikat.innerHTML = "DOBRA ODPOWIEDŹ BRAWOOO!"
   reload.style.visibility = "visible"; // wyświetla przycisk do rozpoczęcia nowej rundy
   punktacjaGry();
  } else {
   komunikat.innerHTML = "Coś nie bardzo. Policz jeszcze raz!"
  }
 }

 /* punktacja*/
 let punktacjaGry = function() {
  punkt++;
  localStorage.setItem("punkty", punkt);
  if (punkt === 10) {
   punktacja.innerHTML = "Brawo. policzyłeś to dobrze aż 10 razy";
   localStorage.removeItem("punkty", punkt);
  }
 }

 /* wyrażenie funkcyjne odswiez
   po poprawnej odopwiedzi przeładowuje stronę, losowany jest nowy zestaw liczb
 */
 let odswiez = function() {
  reszta.value = ""; // czyści pole reszty za każdym przeładowaniem strony
  window.location.reload(true);

 }
 console.log("Cena: " + cena + " Portfel: " + portfel);
 console.log("Rozniaca to: " + roznica);
 buton.addEventListener('click', porownaj); // guzik który obserówj zdarzenie i uruchamia po kliku funkcję porownaj
 przeladuj.addEventListener('click', odswiez); // zdarzenie dla guzika "nowa runda"

})();
