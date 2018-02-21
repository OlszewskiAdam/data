// document.addEventListener("DOMContentLoaded", function(){


    class DateModifier {

        constructor(){
            this.dateElements = []; // Elementy HTML z data do zmiany
            this.dateObjects = []; // Obiekty z data do utworzenia krotkich wersji
            this.datesLong = []; // Tekst z elementów html z pelna nazwa daty
            this.datesShort = []; // Daty po skroceniu

            /*
                Formaty do dni i miesiecy
            */

            this.daysFormatsPL = [
                ["pon.", "wt.", "śr.", "czw.", "pt.", "sob.", "niedz."]
            ]
            this.monthsFormatsPL = [
                ["s-ń", "l-y", "m-c", "k-ń", "m-j", "c-c", "l-c", "si-ń", "w-ń", "p-k", "l-d", "g-ń"],
                ["st.", "lt.", "mrz.", "kw.", "mj.", "czrw.", "lp.", "sp.", "wrz.", "prn.", "lst.", "gr."],
                ["stń", "ly", "mrz", "kń", "mj", "czc", "lc", "sń", "wń", "pk", "ld", "gń"],
                ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE", "LIP", "SIE", "WRZ", "PAZ", "LIS", "GRU"]
            ]
        }

        /*
            Lapiemy elementy po nazwie atrybutu np: data-date do tablicy dateElements
        */

        setDateElements(dataName = "data-date"){
            let dates = document.querySelectorAll("["+dataName+"]");
            if (dates.length == 0) return;
            this.dateElements = dates;
        }

        /*
            Na podstawie data-date tworzy obiekt Date i wrzuca do tablicy
        */

        setDateObjects(dataName = "data-date"){
            let dateElements = this.dateElements;
            if (dateElements.length == 0) return;
            for (let i = 0; i < dateElements.length; i++) {
                let dataDate = parseInt(dateElements[i].getAttribute(dataName));
                let date = new Date(dataDate);
                this.dateObjects.push(date);
            }
        }

        /*
            Formatuje date na podstawie obiektu Date i podanych tablic z formatami.
            addZero dodaje zera do dni miesiąca, godziny i minut jeżeli są jednocyfrowe.
        */

        formatNewDate(date, daysFormats, monthsFormats, addZero = true){
            let day = parseInt(date.getDay());
            let dayMonth = parseInt(date.getDate());
            let month = date.getMonth();
            let year = date.getFullYear();
            let hour = date.getHours();
            let minutes = date.getMinutes();
            switch (day) {
                case 0:
                    day = daysFormats[0];
                    break;
                case 1:
                    day = daysFormats[1];
                    break;
                case 2:
                    day = daysFormats[2];
                    break;
                case 3:
                    day = daysFormats[3];
                    break;
                case 4:
                    day = daysFormats[4];
                    break;
                case 5:
                    day = daysFormats[5];
                    break;
                case 6:
                    day = daysFormats[6];
                    break;
                default:
            }
            switch (month) {
                case 0:
                    month = monthsFormats[0];
                    break;
                case 1:
                    month = monthsFormats[1];
                    break;
                case 2:
                    month = monthsFormats[2];
                    break;
                case 3:
                    month = monthsFormats[3];
                    break;
                case 4:
                    month = monthsFormats[4];
                    break;
                case 5:
                    month = monthsFormats[5];
                    break;
                case 6:
                    month = monthsFormats[6];
                    break;
                case 7:
                    month = monthsFormats[7];
                    break;
                case 8:
                    month = monthsFormats[8];
                    break;
                case 9:
                    month = monthsFormats[9];
                    break;
                case 10:
                    month = monthsFormats[10];
                    break;
                case 11:
                    month = monthsFormats[11];
                    break;

                default:
            }
            if(dayMonth < 10 && addZero){
                dayMonth = "0" + dayMonth;
            }
            if(hour < 10 && addZero){
                hour = "0" + hour;
            }
            if(minutes < 10 && addZero){
                minutes = "0" + minutes;
            }
            let newDate = day + " " + dayMonth + " " + month + " " + year + ", " + hour + ":" + minutes;
            return newDate;
        }

        /*
            Zaciaga obiekty dat i na ich podstawie tworzy krotka wersje daty
        */

        setDatesShort(dayFormatsNumber = 0, monthsFormatsNumber = 0, addZero = true){
            let dateObjects = this.dateObjects;
            if (dateObjects.length == 0) return;
            this.datesShort = [];
            for (let i = 0; i < dateObjects.length; i++) {
                let date = dateObjects[i];
                var shortDate = this.formatNewDate(date, this.daysFormatsPL[dayFormatsNumber], this.monthsFormatsPL[monthsFormatsNumber], addZero);
                this.datesShort.push(shortDate);
            }
        }

        /*
            Zaciaga tekst z elementu HTML i wstawia do tablicy jako dluga date
        */

        setDatesLong(){
            let dateElements = this.dateElements;
            if (dateElements.length == 0) return;
            for (let i = 0; i < dateElements.length; i++) {
                let date = dateElements[i].innerText;
                this.datesLong.push(date);
            }
        }

        /*
            Zmienia date na krotka lub dluga
        */

        changeDate(format = ""){
            if(format == "short"){
                var dateElements = this.dateElements;
                for (var i = 0; i < dateElements.length; i++) {
                    dateElements[i].innerText = this.datesShort[i];
                }
            }
            else if(format == "long"){
                var dateElements = this.dateElements;
                for (var i = 0; i < dateElements.length; i++) {
                    dateElements[i].innerText = this.datesLong[i];
                }
            }
            else{
                console.log("Wymagany argument format 'short' lub 'long'");
                return;
            }
        }
    }

    const changeDateFormat = new DateModifier();


    changeDateFormat.setDateElements(); // lapiemy elementy w ktorych chcemy zmieniac date
    changeDateFormat.setDateObjects(); // wyciaga dane z data-date i tworzy obiekty Date
    changeDateFormat.setDatesLong(); // zawartosc elementu jest zapisywana jako dluga data
    changeDateFormat.setDatesShort(0,0); // ustawia krotkie daty






    /* do buttonow do testow */

    let shortBut = document.getElementById("short");
    let longBut = document.getElementById("long");
    shortBut.onclick = function(){
        let options = document.querySelectorAll("[name='option']");
        for (var i = 0; i < options.length; i++) {
            if(options[i].checked){
                console.log(options[i].value);
                changeDateFormat.setDatesShort(0, options[i].value);
            }
        }
        changeDateFormat.changeDate("short");
    };
    longBut.onclick = function(){
        changeDateFormat.changeDate("long");
    };

// })
