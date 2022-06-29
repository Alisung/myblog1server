const connection = require("../databasecode");

const postlistCtrl = {
  //함수
  getPost: async (req, res) => {
    const sql = "SELECT * FROM myblog1.postlist";
    const sql2 = "SELECT * FROM myblog1.commendlist";
    connection.query(sql, (error, rows1) => {
      if (error) throw error;

      connection.query(sql2, (error, rows2) => {
        res.send({ array1: rows1, array2: rows2 });
      });
    });
  },
  getPostCommend: async (req, res) => {
    connection.query("SELECT * FROM myblog1.commendlist", (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },
  insertPost: async (req, res) => {
    const { id, textcommend, toglelist, userId } = req.body;
    const sql = `INSERT INTO myblog1.postlist(textcommend,toglelist,userId) VALUES("${textcommend}",${toglelist},"${userId}");`;
    const sql3 = `SET @count=0;`;
    const sql4 = `UPDATE myblog1.postlist SET id=@count:=@count+1;`;
    connection.query(sql, (error, rows) => {
      if (error) throw error;
      connection.query(sql3, (error, rows) => {
        if (error) throw error;
        connection.query(sql4, (error, rows) => {
          if (error) throw error;
          res.send(rows);
        });
      });
    });
  },
  deletePost: async (req, res) => {
    const id = req.body.id;

    let sql = `DELETE FROM myblog1.postlist WHERE id = ?;`;
    let sql2 = `DELETE FROM myblog1.commendlist WHERE IdNumber = ?;`;
    const sql3 = `SET @count=0;`;
    const sql4 = `UPDATE myblog1.postlist SET id=@count:=@count+1;`;
    let sql5 = `UPDATE myblog1.commendlist SET IdNumber = if(IdNumber>?,IdNumber-1,IdNumber)`;
    const sql6 = `SET @count=0;`;
    const sql7 = `UPDATE myblog1.commendlist SET id=@count:=@count+1;`;
    connection.query("SET SQL_SAFE_UPDATES = 0");
    connection.query(sql, [id], (error, rows) => {
      if (error) throw error;
      connection.query(sql3, (error, rows) => {
        if (error) throw error;
        connection.query(sql4, (error, rows) => {
          if (error) throw error;
          connection.query(sql2, [id], (error, rows) => {
            if (error) throw error;
            connection.query(sql5, [id], (error, rows) => {
              if (error) throw error;
              connection.query(sql6, (error, rows) => {
                if (error) throw error;
                connection.query(sql7, (error, rows) => {
                  if (error) throw error;
                  res.send(rows);
                });
              });
            });
          });
        });
      });
    });
  },
  changeTextPost: async (req, res) => {
    const id = req.body.id;
    const textcommend = req.body.textcommend;
    let sql = `update myblog1.postlist set textcommend="?" where id= ?;`;
    connection.query(sql, [textcommend, id], (error, rows) => {
      if (error) throw error;
      res.send(rows);
    });
  },
  insertcommend: async (req, res) => {
    const { id, textcommend2, userId, postId, IdNumber, count } = req.body;
    const sql = `INSERT INTO myblog1.commendlist(textcommend2,userId,postId,IdNumber, count) VALUES("${textcommend2}","${userId}","${postId}",${IdNumber},${count});`;
    const sql3 = `SET @count=0;`;
    const sql4 = `UPDATE myblog1.commendlist SET id=@count:=@count+1;`;
    connection.query(sql, (error, rows) => {
      if (error) throw error;
      connection.query(sql3, (error, rows) => {
        if (error) throw error;
        connection.query(sql4, (error, rows) => {
          if (error) throw error;
          res.send(rows);
        });
      });
    });
  },
  deletecommend: async (req, res) => {
    const vid = req.body.id;
    const commendid = req.body.id2;
    const IdNumber = req.body.IdNumber;
    let sql = `DELETE FROM myblog1.commendlist WHERE  count= ? AND IdNumber = ?;`;
    const sql3 = `SET @count=0, @counts=0;`;
    let sql4 = `UPDATE myblog1.commendlist SET id=@counts:=@counts+1,count=if(IdNumber = ?,(@count:=@count+1),count)`;
    connection.query("SET SQL_SAFE_UPDATES = 0");
    connection.query(sql, [commendid, vid], (error, rows) => {
      connection.query(sql3, (error, rows) => {
        connection.query(sql4, [IdNumber], (error, rows) => {
          res.send(rows);
        });
      });
    });
  },
};

module.exports = postlistCtrl;
