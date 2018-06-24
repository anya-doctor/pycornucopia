# coding=utf-8
import os
import shutil

root_path = "C:\Users\Administrator\Desktop"
source_path = "C:\Users\Administrator\Desktop\pycornucopia"

dir_list = os.listdir(root_path)


while_lst = ['.git', 'core', '.db', 'log']
def mv_dir(from_dir, to_dir):
    for roots, dirs, files in os.walk(from_dir):
        for ifile in files:
            from_file = roots + '/' + ifile
            for i in while_lst:
                if i in from_file:
                    break
            else:
                to_file = from_file.replace(from_dir, to_dir)
                print "from:", from_file
                print "to:", to_file
                shutil.copyfile(from_file, to_file)

for (root, dirs, files) in os.walk(root_path):
    # for filename in files:
    #     print os.path.join(root, filename)

    for dirc in dirs:
        real_dic = os.path.join(root, dirc)
        if '.git' in real_dic:
            continue
        if 'pycornucopia' in real_dic:
            continue

        if os.path.exists(os.path.join(real_dic, "main.pyw")):
            real_root_dic = os.path.join(root, dirc)
            print real_root_dic
            mv_dir(source_path, real_root_dic)