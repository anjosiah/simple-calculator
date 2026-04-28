from os import system, name

# Kalkulator sederhana dengan statistik operasi.
# Program ini menerima input menu dari pengguna,
# melakukan operasi aritmatika dasar, dan mencatat
# berapa kali setiap jenis operasi dijalankan.

statistik = {
    "penjumlahan": 0,
    "pengurangan": 0,
    "perkalian": 0,
    "pembagian": 0,
}

def menu():
    """Tampilkan menu dan baca pilihan pengguna."""
    print("Kalkulator")
    print("1. Penjumlahan")
    print("2. Pengurangan")
    print("3. Perkalian")
    print("4. Pembagian")
    print("5. Statistik")
    print("6. Exit")
    return input("Masukkan angka 1/2/3/4/5/6: ")


def clear_screen():
    """Bersihkan layar sesuai sistem operasi."""
    command = "cls" if name == "nt" else "clear"
    system(command)


def get_number(prompt):
    """Baca angka dari pengguna, ulangi jika input tidak valid."""
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Masukkan angka yang benar, misalnya 2.5 atau 10.")


def addition(num1, num2):
    return f"{num1} + {num2} = {num1 + num2}"


def subtraction(num1, num2):
    return f"{num1} - {num2} = {num1 - num2}"


def multiplication(num1, num2):
    return f"{num1} * {num2} = {num1 * num2}"


def division(num1, num2):
    return f"{num1} / {num2} = {num1 / num2}"


def statistics():
    print("Statistik")
    print("Penjumlahan :", statistik["penjumlahan"])
    print("Pengurangan :", statistik["pengurangan"])
    print("Perkalian :", statistik["perkalian"])
    print("Pembagian :", statistik["pembagian"])
    print("Total :", sum(statistik.values()))


def main():
    pilihan = ""

    while pilihan != "6":
        pilihan = menu()

        if pilihan in ["1", "2", "3", "4"]:
            angka1 = get_number("Angka 1: ")
            angka2 = get_number("Angka 2: ")

            if pilihan == "1":
                print(addition(angka1, angka2))
                statistik["penjumlahan"] += 1
            elif pilihan == "2":
                print(subtraction(angka1, angka2))
                statistik["pengurangan"] += 1
            elif pilihan == "3":
                print(multiplication(angka1, angka2))
                statistik["perkalian"] += 1
            elif pilihan == "4":
                if angka2 == 0:
                    print("Tidak dapat dibagi dengan 0")
                else:
                    print(division(angka1, angka2))
                    statistik["pembagian"] += 1

        elif pilihan == "5":
            statistics()

        elif pilihan == "6":
            print("Keluar aplikasi")
            break

        else:
            print("Pilihan tidak ditemukan")

        system("pause")
        clear_screen()


if __name__ == "__main__":
    main()