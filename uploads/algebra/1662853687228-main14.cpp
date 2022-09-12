
#include <iostream>

using namespace std;
// zad.1 Wstaw element za

struct node
{
    node *next;
    int val;
};

void Add(node *&H, int val)
{
    node *p = new node;
    p->next = H;
    p->val = val;
    H = p;
}

void Show(node *H)
{
    cout << "H->";
    node *p = H;
    while (p)
    {
        cout << p->val << "->";
        p = p->next;
    }
    cout << "NULL" << endl;
};
void Kopia(node *&H)
{
    node *p = H;
    while (p)
    {
        node *e = new node;
        e->val = p->val;
        e->next = p->next;
        p->next = e;
        p = e->next;
    }
}

/*void Kopia(node*&H){
    node*p = H;
    while(p){
        node*e = new node;
        e->val = p->val;
        e->next = p->next;
        p->next = e;
        p = e->next;

    }
}*/
void DodajZa(node *e, int val)
{ // e - element za który chcemy wstawić
    node *p = new node;
    p->next = e->next;
    p->val = val;
    e->next = p;
}

void Kopia_ilosc(node *&H)
{
    node *p = H;
    while (p)
    {
        for (int i = 0; i < p->val - 1; i++)
        {
            DodajZa(p, p->val);
            p = p->next;
        }
        p = p->next;
    }
}

// zad.2 zamiana 1 z ostatnim
void Zamiana1zostatnim(node *&H)
{
    if (H != NULL && H->next != NULL)
    {
        node *p = H;
        while (p->next != NULL)
        {
            p = p->next;
        };

        node *e = new node;
        e->val = H->val;
        e->next = p->next;
        p->next = e;

        p = p->next;
        p->next->next = H->next;
        H = p->next;
        p->next = NULL;
    }
}

// zad. 3 funkja sortuje przy dodawaniu

void Add_sort(node *&H, int val)
{
    node *t = new node; // funkcja dodająca
    t->next = H;
    t->val = H->val;
    H = t;

    node *p = H; // sprawdzamy wartość dodawanego elementu
    while (p->next && p->next->val < val)
    {
        p = p->next;
    }
    node *e = new node; // zamiana miejscami dwóch sąsiednih elementów
    e->next = p->next;
    e->val = val;
    p->next = e;

    node *d = t;
    H = d->next;
    delete d;
}

// zad.4 Napisz funkcję, która powoduje przeniesienie ostatniego elementu listy na pierwsze miejsce (przed „głowę”).
void Przenies(node *&H, int val)
{
    if (H != NULL && H->next != NULL)
    {
        node *p = H;
        while (p->next->next != NULL)
        {
            p = p->next;
        };
        Add(H, H->val);
        p->next->next = H;
        H->val = p->next->val;
        p->next = NULL;
    }
}
void Swap(node *&H)
{
    if (H && H->next)
    {
        node *p = H;
        H = H->next; // H=p->next
        p->next = p->next->next;
        H->next = p;
    }
}

// zad.5 Napisz funkcje, która zamienia element o podanym kluczu ze swoim następnikiem.
void Zamien(node *&H, int x)
{ // x - podany klucz
    if (H != NULL && H->next != NULL)
    {
        if (H->val == x)
        {
            Swap(H);
        }
        else
        {
            node *p = H;
            while (p->next != NULL && p->next->val != x)
            {
                p = p->next;
            }
            if (p->next)
                Swap(p->next);
        }
    }
}
// zad.6  Napisz funkcje, która zamienia element o podanym kluczu ze swoim poprzednikiem.
void ZamienPrev(node *&H, int x)
{
    if (H != NULL && H->next != NULL)
    {
        if (H->next->val == x)
        {
            Swap(H);
        }
        else
        {
            node *e = new node;
            while (e->next != NULL && e->next->val != x)
            {
                e = e->next;
            }
            if (e->next)
                Swap(e->next);
        }
    }
}
// zad.7 Napisz funkcję kasującą co 2 element listy.

void DeleteSecond(node *H)
{
    if (H != NULL)
    {
        node *p = H;
        while (p->next != NULL)
        {
            node *e = p->next->next;
            delete p->next;
            p->next = e;
            p = p->next;
        }
    }
}
// zad.8 Napisz funkcje kasująca n elementów za podanym x.
/*void Delete_N(node*&H, int n, int x){
    if(H)
    {
        node*p =H;
        while( p->next->val != x ) p = p->next;
                p->next = x->next;
                delete -> next;

            }
}*/
// zad.9 Odwracająca listę
void Reverse(node *&H)
{
    if (H)
    {
        node *pc, *p;
        pc = H; // adres pierwszego elementu
        while (pc->next)
        {
            p = pc->next;       // adres kolejnego elementu
            pc->next = p->next; // wyjmujemy następnik z listy
            p->next = H;        // wstawiamy na początek
            H = p;
        }
    }
}
// zad.12 Napisz funkcję kopiująca za siebie listę 1 razy
node *Clone(node *&H)
{
    if (H != NULL)
    {
        node *R = NULL;
        node *p = H;
        while (p != NULL)
        {
            Add(R, p->val);
            p = p->next;
        }
        return R;
    }
};
void Add_copy_to_end(node *&H)
{
    node *R = new node;
    R = Clone(H);
    if (H != NULL)
    {
        node *p = H;
        while (p != NULL)
        {
            cout << p->val << "->";
            p = p->next;
        }
    }
}

// zad. 13 Funkcja kopująca elementy o ich wartości
void Kopia_Ilosc(node *&H)
{
    node *p = H;
    while (p)
    {
        for (int i = 0; i < p->val - 1; i++)
        {
            DodajZa(p, p->val);
            p = p->next;
        }
        p = p->next;
    }
}
// Sortowanie bąbelkowe
void Bubble_Sort(node *&H)
{
    if (H != NULL && H->next != NULL)
    {
        Add(H, 0);
        node *last = NULL;

        node *p = H;
        while (p->next != last)
        {
            while (p->next->next != last)
            {
                if (p->next->val < p->next->next->val)
                {
                    Swap(p);
                }
                p = p->next;
            }
            last = p->next;
        }
    }
    delete (H);
}
// 16. Napisz funkcję, która usuwa z listy elementy parzyste(co do wartości).
void Delete(node *&H)
{
    if (H)
    {
        node *e = H;
        H = e->next;
        delete e;
    }
};

void DeleteEven(node *&H)
{
    Add(H, 0);
    if (H->next)
    {
        node *e = H;
        while (e->next != NULL)
        {
            if (e->next->val % 2 == 0)
            {
                Delete(e->next);
            }
            else
            {
                e = e->next;
            }
        }

        Delete(H);
    }
}
// 17. Napisz funkcję, która zamieni miejscami element maksymalny z elementem minimalnym na liście.
// p - wskaźnik el listy
node *Max(node *&H)
{
    node *p, *pmax;
    if (H)
    {
        pmax = H; // w p umieszczamy adres następnika pierwszego elementu listy
        for (p = H->next; p; p = p->next)
        {
            if (p->val > pmax->val)
            {
                pmax = p;
            }
        }
    }
    cout << ("pmax");
    Show(pmax);
    return pmax;
}
node *Min(node *&H)
{
    node *p, *pmin;
    if (H)
    {
        pmin = H; // w p umieszczamy adres następnika pierwszego elementu listy
        for (p = H->next; p; p = p->next)
        {
            if (p->val < pmin->val)
            {
                pmin = p;
            }
        }
    }
    return pmin;
}

void Zamiana(node *&H)
{
    node *A = Max(H);
    node *ANext = A->next;
    node *B = Min(H);
    if (H != NULL && H->next != NULL)
    {
        node *p = H;

        while (p && p->next != A)
            p = p->next;
        node *prevA = p;
        p = H;
        while (p && p->next != B)
            p = p->next;
        node *prevB = p;
        cout << "A";
        Show(A);
        cout << "prevA";
        Show(prevA);
        cout << "B";
        Show(B);
        cout << "prevB";
        Show(prevB);
        if (prevA != NULL)
            prevA->next = B;
        else
            H = B;
        if (prevB != NULL)
            prevB->next = A;
        else
            H = A;

        p = A->next;
        A->next = B->next;
        B->next = ANext;
    }
}

/*// zad.18 18. Napisz funkcję, która elementy parzyste przeniesie na koniec listy.
void Parzyste(node*&H){
    if(H != NULL){
        node*p = H;
        node*e = H;
        if(p->val %2 == 0){
            while(e->next != NULL){
            e = e->next;
            }
            e->next = p;
            e->next->val = p->val;
            p->next = p->next->next;
    }       p = p->next;
}
}*/

int main()
{
    node *H = NULL;
    cout << H << endl;
    Add(H, 8);
    Add(H, 3);
    Add(H, 10);
    Add(H, 7);
    Add(H, 9);
    Add(H, 15);
    /*
    Add(H, 2);
    Add(H, 1);
    Add(H, 5);
    Add(H, 4);
    Add(H, 8);
    Add(H, 7);
    Add(H, 3);*/
    // Show(H);
    // Kopia(H);
    // Show(H);
    // Kopia_ilosc(H);
    // Show(H);
    // Zamiana1zostatnim(H);
    // Show(H);
    /*Add_sort(H, 8);
    Add_sort(H, 9);
    Add_sort(H, 3);*/
    // Przenies(H,H->val);
    // Show(H);
    // Zamien(H,9);
    // Show(H);
    // ZamienPrev(H,9);
    // DeleteEven(H);
    // DeleteSecond(H);
    // Show(H);
    // Reverse(H);
    // Show(H);
    /*Add_copy_to_end(H);
    Show(H);
    Kopia_Ilosc(H);
    Show(H);*/
    Show(H);
    Zamiana(H);
    // Parzyste(H);
    Show(H);

    system("pause");

    return 0;
}
