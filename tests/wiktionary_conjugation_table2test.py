#!/usr/bin/env python3

from lxml import etree;
import requests;
import sys;

def extract_arabic_text(element):
    elems = getElementsByClassName(element, "Arab");
    texts = ['"' + extract_text(x) + '"' for x in elems];
    if(len(texts) == 1):
        return texts[0];
    return "[" + ", ".join(texts)  + "]";
    
def extract_text(element):
    if(element.text is not None):
        return element.text;
    return extract_text(element[0]);

def getClassName(element):
    if("class" in element.attrib):
        return element.attrib["class"].split(" ");
    return [];
    
def _getElementsByClassName(element, className, resultList):
    if(className in getClassName(element)):
        resultList.append(element);
    for child in element:
        _getElementsByClassName(child, className, resultList);

def getElementsByClassName(element, className):
    result = [];
    _getElementsByClassName(element, className, result);
    return result;

def get_table_body(table):
    for child in table.getchildren():
        if(child.tag == "tbody"):
            return child;
    raise Error("Table has no body");

def query(url):
    if(url.startswith("file://")):
        with open(url[7:], "r") as f:
            return f.read();
    response = requests.get(url);
    return response.text;
    
def traverse_imperative_table(male, female):
    order = [
        ("male", 3, "singular"), ("female", 1, "singular"),
        
        ("male", 5, "dual"),
        
        ("male", 8, "plural"), ("female", 2, "plural"),
    ];
    
    lastNumerus = "singular";    
    for (gender, index, numerus) in order:
        row = male;
        if(gender == "female"):
            row = female;
        
        arab = extract_arabic_text(row[index]);
        if(lastNumerus != numerus):
            print();
        print('{ voice: "' + voice + '", expected: ' + arab + ', gender: "' + gender + '", person: "second", numerus: "' + numerus + '", tense: "present", mood: "imperative" },');
        lastNumerus = numerus;
    

def traverse_table(voice, tense, male, female):
    order = [
        ("male", 4, "third", "singular"), ("female", 2, "third", "singular"),
        ("male", 3, "second", "singular"), ("female", 1, "second", "singular"),
        ("male", 2, "first", "singular"),
        
        ("male", 6, "third", "dual"), ("female", 3, "third", "dual"),
        ("male", 5, "second", "dual"),
        
        ("male", 9, "third", "plural"), ("female", 5, "third", "plural"),
        ("male", 8, "second", "plural"), ("female", 4, "second", "plural"),
        ("male", 7, "first", "plural")
    ];
    
    lastPerson = "third";
    for (gender, index, person, numerus) in order:
        row = male;
        if(gender == "female"):
            row = female;
        
        arab = extract_arabic_text(row[index]);
        if(lastPerson != "third" and person == "third"):
            print();
            
        if(tense == "past"):
            tenseStr = 'tense: "perfect", mood: "indicative"';
        else:
            tenseStr = 'tense: "present", mood: "' + tense + '"';
            
        print('{ voice: "' + voice + '", expected: ' + arab + ', gender: "' + gender + '", person: "' + person + '", numerus: "' + numerus + '", ' + tenseStr + ' },');
        lastPerson = person;

url = sys.argv[1];
tableIndex = int(sys.argv[2]);

response = query(url);
document = etree.fromstring(response, etree.HTMLParser());

tables = getElementsByClassName(document, "inflection-table");
table = tables[tableIndex];
tbody = get_table_body(table);

children = tbody.getchildren();
baseRow = children[2];
baseIdx = 6; #verbal noun, active participle, (potentially passive participle), empty row, active voice row, numerus row, person row
if(len(baseRow.getchildren()) > 1): #in case there is no passive participle
	baseIdx += 1;

for voice in ["active", "passive"]:
    for tense in ["past", "indicative", "subjunctive", "jussive"]:
        print();
        print("//" + voice + " " + tense);
        male = children[baseIdx];
        female = children[baseIdx + 1];
        traverse_table(voice, tense, male, female);
        baseIdx += 2;
        
    if(voice == "active"):
        print();
        print("//imperative");
        
        male = children[baseIdx];
        female = children[baseIdx + 1];
        traverse_imperative_table(male, female);
        baseIdx += 2;
        
        baseIdx += 4; #skip to passive rows (empty row, passive voice row, numerus row, person row)
